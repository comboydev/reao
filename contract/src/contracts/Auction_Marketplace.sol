// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./interface/RoyaltyFactory.sol";
import "./INft_Marketplace.sol";
import "./FeeManager.sol";

contract Auction_Marketplace is INft_Marketplace, FeeManager, IERC721Receiver {
    using SafeMath for uint256;
    string internal nft_symbol = "symbol here";
    string bnb_Symbol = "BNB";
    // From ERC721 registry assetId to Order (to avoid asset collision)
    mapping(address => mapping(uint256 => Order)) orderByAssetId;

    // From ERC721 registry assetId to Bid (to avoid asset collision)
    mapping(address => mapping(uint256 => Bid)) bidByOrderId;

    // from ERC20 symbols to their addresses
    mapping(string => address) acceptedTokens;

    // array that saves all the symbols of accepted tokens
    string[] public acceptedTokensSymbols;

    constructor() public {}

    // 721 Interfaces
    bytes4 public constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ROYALTY = 0x0760a14c;

    /**
     * Creates a new order
     *  _nftAddress - Non fungible contract address
     *  _assetId - ID of the published NFT
     *  _priceInAnyOfTheSupportedCurrencies - price In Any Of The Supported Currencies
     *  _expiresAt - Duration of the order (in hours)
     */

    function getBid(address _nftAddress, uint256 _assetId)
        public
        view
        returns (
            bytes32 id,
            address bidder,
            string memory tokenSymbol,
            uint256 price
        )
    {
        Bid memory bid = bidByOrderId[_nftAddress][_assetId];
        id = bid.id;
        bidder = bid.bidder;
        tokenSymbol = bid.tokenSymbol;
        price = bid.price;
    }

    function createOrder(
        address _nftAddress,
        uint256 _assetId,
        string memory _tokenSymbol,
        uint256 _price,
        uint256 _expiresAt
    ) public returns (bytes32) {
        return
            _createOrder(
                _nftAddress,
                _assetId,
                _tokenSymbol,
                _price,
                _expiresAt
            );
    }

    /**
     *  Cancel an already published order
     *  can only be canceled by seller or the contract owner
     *  nftAddress - Address of the NFT registry
     *  assetId - ID of the published NFT
     */
    function cancelOrder(address _nftAddress, uint256 _assetId) public {
        Order memory order = orderByAssetId[_nftAddress][_assetId];

        require(order.seller == msg.sender, "Marketplace: unauthorized sender");

        // Remove pending bid if any
        Bid memory bid = bidByOrderId[_nftAddress][_assetId];

        if (bid.id != 0) {
            _cancelBid(_nftAddress, _assetId);
        }

        // Cancel order.
        _cancelOrder(order.id, _nftAddress, _assetId, msg.sender);
    }

    /**
     *  Places a bid for a published NFT
     *  _nftAddress - Address of the NFT registry
     *  _assetId - ID of the published NFT
     *  _priceInAny Of The Supported Currencies - Bid price in acceptedToken currency
     *  _expiresAt - Bid expiration time
     */
    function safePlaceBid(
        address _nftAddress,
        uint256 _assetId,
        string memory _tokenSymbol,
        uint256 _price,
        uint256 _expiresAt
    ) public {
        _createBid(_nftAddress, _assetId, _tokenSymbol, _price, _expiresAt);
    }

    /**
     * @dev Cancel an already published bid
     *  can only be canceled by seller or the contract owner
     * @param _nftAddress - Address of the NFT registry
     * @param _assetId - ID of the published NFT
     */
    function cancelBid(address _nftAddress, uint256 _assetId) public {
        Bid memory bid = bidByOrderId[_nftAddress][_assetId];

        require(
            bid.bidder == msg.sender || msg.sender == owner(),
            "Marketplace: Unauthorized sender"
        );

        _cancelBid(_nftAddress, _assetId);
    }

    /**
     * Executes the sale for a published NFT by accepting a current bid
     *  _nftAddress - Address of the NFT registry
     *  _assetId - ID of the published NFT
     *  _priceInAnyOfTheFourCurrencies - price In Any Of The Four Currencies
     */
    function acceptBid(address _nftAddress, uint256 _assetId) public {
        // check order validity
        Order memory order = _getValidOrder(_nftAddress, _assetId);

        // item seller is the only allowed to accept a bid
        require(order.seller == msg.sender, "Marketplace: unauthorized sender");

        Bid memory bid = bidByOrderId[_nftAddress][_assetId];

        require(
            bid.expiresAt >= block.timestamp,
            "Marketplace: the bid expired"
        );

        // remove bid
        delete bidByOrderId[_nftAddress][_assetId];

        emit BidAccepted(bid.id);

        uint256 saleShareAmount = 0;
        address tokenAddress = acceptedTokens[order.tokenSymbol];
        ERC20 acceptedToken = ERC20(tokenAddress);
        uint256 royaltyFeeAmount = 0;
        if (IERC165(_nftAddress).supportsInterface(_INTERFACE_ID_ROYALTY)) {
            address orignalCreater = RoyaltyFactory(_nftAddress)
            .getOriginalCreator(_assetId);
            uint256 royaltyFee = RoyaltyFactory(_nftAddress).getRoyaltyFee(
                _assetId
            );
            royaltyFeeAmount = bid.price.mul(royaltyFee).div(1e6);
            if (compareStrings(order.tokenSymbol, bnb_Symbol)) {
                // Transfer share amount for marketplace Owner
                payable(orignalCreater).transfer(royaltyFeeAmount);
            } else {
                acceptedToken.transferFrom(
                    address(this), //escrow
                    orignalCreater,
                    royaltyFeeAmount
                );
            }
        }
        // calc market fees
        if (FeeManager.cutPerMillion > 0) {
            // Calculate sale share
            saleShareAmount = bid.price.mul(FeeManager.cutPerMillion).div(1e6);

            if (compareStrings(order.tokenSymbol, nft_symbol)) {
                // Transfer half of share amount for marketplace Owner
                acceptedToken.transferFrom(
                    address(this), //escrow
                    owner(),
                    saleShareAmount.div(3)
                );
            } else if (compareStrings(order.tokenSymbol, bnb_Symbol)) {
                // Transfer share amount for marketplace Owner
                payable(owner()).transfer(saleShareAmount);
            } else {
                acceptedToken.transferFrom(
                    address(this), //escrow
                    owner(),
                    saleShareAmount
                );
            }
        }

        // transfer escrowed bid amount minus market fee to seller
        if (compareStrings(order.tokenSymbol, nft_symbol)) {
            // Transfer accepted token amount minus market fee to seller
            uint256 amount = bid.price.sub(saleShareAmount.div(3).mul(2)).sub(
                royaltyFeeAmount
            );
            acceptedToken.transferFrom(
                address(this), //escrow
                order.seller, // seller
                amount
            );
        } else if (compareStrings(order.tokenSymbol, bnb_Symbol)) {
            // Transfer share amount for marketplace Owner
            payable(order.seller).transfer(
                bid.price.sub(saleShareAmount).sub(royaltyFeeAmount)
            );
        } else {
            // Transfer accepted token amount minus market fee to seller
            acceptedToken.transferFrom(
                address(this), //escrow
                order.seller, // seller
                bid.price.sub(saleShareAmount).sub(royaltyFeeAmount)
            );
        }

        _executeOrder(
            order.id,
            bid.bidder,
            _nftAddress,
            _assetId,
            order.tokenSymbol,
            bid.price
        );
    }

    /**
     * Internal function gets Order by nftRegistry and assetId. Checks for the order validity
     * nftAddress - Address of the NFT registry
     * assetId - ID of the published NFT
     */
    function _getValidOrder(address _nftAddress, uint256 _assetId)
        internal
        view
        returns (Order memory order)
    {
        order = orderByAssetId[_nftAddress][_assetId];

        require(order.id != 0, "Marketplace: asset not published");
        require(
            order.expiresAt >= block.timestamp,
            "Marketplace: order expired"
        );
    }

    /**
     * Executes the sale for a published NFT
     *  orderId - Order Id to execute
     *  buyer - address
     *  nftAddress - Address of the NFT registry
     *  assetId - NFT id
     *  price - Order price
     */
    function _executeOrder(
        bytes32 _orderId,
        address _buyer,
        address _nftAddress,
        uint256 _assetId,
        string memory _tokenSymbol,
        uint256 _price
    ) internal {
        // remove order

        // Transfer NFT asset
        Order memory order = orderByAssetId[_nftAddress][_assetId];
        // Transfer NFT asset
        IERC721(_nftAddress).safeTransferFrom(address(this), _buyer, _assetId);
        delete orderByAssetId[_nftAddress][_assetId];
        // Notify ..
        emit OrderSuccessful(
            order.id,
            order.seller,
            _buyer,
            order.nftAddress,
            order.nftId,
            order.tokenSymbol,
            _price,
            block.timestamp
        );
    }

    /**
     * Creates a new order
     *  nftAddress - Non fungible contract address
     *  assetId - ID of the published NFT
     *  priceInAnyOfTheSupportedCurrencies - price In Any Of The Supported Currencies
     *  expiresAt - Expiration time for the order
     */
    function _createOrder(
        address _nftAddress,
        uint256 _assetId,
        string memory _tokenSymbol,
        uint256 _price,
        uint256 _expiresAt
    ) internal returns (bytes32) {
        // Check nft registry
        IERC721 nftRegistry = _requireERC721(_nftAddress);

        // Check order creator is the asset owner
        address assetOwner = nftRegistry.ownerOf(_assetId);

        require(
            assetOwner == msg.sender,
            "Marketplace: Only the asset owner can create orders"
        );

        require(_price > 0, "Marketplace: Price should be bigger than 0");

        require(
            _expiresAt > block.timestamp.add(1 minutes),
            "Marketplace: Publication should be more than 1 minute in the future"
        );

        // get NFT asset from seller
        nftRegistry.safeTransferFrom(assetOwner, address(this), _assetId);

        // create the orderId
        bytes32 orderId = keccak256(
            abi.encodePacked(
                block.timestamp,
                assetOwner,
                _nftAddress,
                _assetId,
                _tokenSymbol,
                _price
            )
        );

        // save order
        orderByAssetId[_nftAddress][_assetId] = Order({
            id: orderId,
            seller: assetOwner,
            nftAddress: _nftAddress,
            nftId: _assetId,
            tokenSymbol: _tokenSymbol,
            price: _price,
            expiresAt: _expiresAt
        });
        emit OrderCreated(
            orderId,
            assetOwner,
            _nftAddress,
            _tokenSymbol,
            _assetId,
            _price,
            _expiresAt
        );
        return orderId;
    }

    /**
     *  Creates a new bid on a existing order
     *  nftAddress - Non fungible contract address
     *  assetId - ID of the published NFT
     *  priceInAnyOfTheSupportedCurrencies - price In Any Of The Supported Currencies
     *  expiresAt - expires time
     */
    function _createBid(
        address _nftAddress,
        uint256 _assetId,
        string memory _tokenSymbol,
        uint256 _price,
        uint256 _expiresAt
    ) internal {
        // Checks order validity
        Order memory order = _getValidOrder(_nftAddress, _assetId);

        // check on expire time
        if (_expiresAt > order.expiresAt) {
            _expiresAt = order.expiresAt;
        }

        // Check price if theres previous a bid
        Bid memory bid = bidByOrderId[_nftAddress][_assetId];

        // if theres no previous bid, just check price > 0
        if (bid.id != 0) {
            if (bid.expiresAt >= block.timestamp) {
                if (compareStrings(order.tokenSymbol, bnb_Symbol)) {
                    require(
                        msg.value >= bid.price,
                        "Marketplace: bid price should be higher than last bid"
                    );
                } else {
                    require(
                        _price > bid.price,
                        "Marketplace: bid price should be higher than last bid"
                    );
                }
            } else {
                if (compareStrings(order.tokenSymbol, bnb_Symbol)) {
                    require(
                        msg.value >= order.price,
                        "Marketplace: bid should be >= inital order price"
                    );
                } else {
                    require(
                        _price >= order.price,
                        "Marketplace: bid should be >= inital order price"
                    );
                }
            }

            _cancelBid(_nftAddress, _assetId);
        } else {
            if (compareStrings(order.tokenSymbol, bnb_Symbol)) {
                require(
                    msg.value >= order.price,
                    "Marketplace: bid should be >= inital order price"
                );
            } else {
                require(
                    _price >= order.price,
                    "Marketplace: bid should be >= inital order price"
                );
            }
        }

        // bidding is only with specific Token ( this needs to be updated when we go live to Binance smart chain )
        address tokenAddress = acceptedTokens[order.tokenSymbol];
        ERC20 acceptedToken = ERC20(tokenAddress);

        // Transfer sale amount from bidder to escrow
        if (!compareStrings(order.tokenSymbol, bnb_Symbol)) {
            acceptedToken.transferFrom(
                msg.sender, // bidder
                address(this),
                _price
            );
        }
        // Create bid
        bytes32 bidId = keccak256(
            abi.encodePacked(
                block.timestamp,
                msg.sender,
                order.id,
                _price,
                _expiresAt
            )
        );

        // Save Bid for this order
        bidByOrderId[_nftAddress][_assetId] = Bid({
            id: bidId,
            bidder: msg.sender,
            tokenSymbol: order.tokenSymbol,
            price: _price,
            expiresAt: _expiresAt
        });

        emit BidCreated(
            bidId,
            order.seller,
            _nftAddress,
            _assetId,
            msg.sender, // bidder
            order.tokenSymbol,
            _price,
            _expiresAt
        );
    }

    /**
     * Cancel an already published order
     *  can only be canceled by seller or the contract owner
     * orderId - Bid identifier
     * nftAddress - Address of the NFT registry
     * assetId - ID of the published NFT
     * seller - Address
     */
    function _cancelOrder(
        bytes32 _orderId,
        address _nftAddress,
        uint256 _assetId,
        address _seller
    ) internal {
        delete orderByAssetId[_nftAddress][_assetId];
        /// send asset back to seller
        IERC721(_nftAddress).safeTransferFrom(address(this), _seller, _assetId);

        emit OrderCancelled(_orderId);
    }

    /**
     * Cancel bid from an already published order
     *  can only be canceled by seller or the contract owner
     * bidId - Bid identifier
     * nftAddress - registry address
     * assetId - ID of the published NFT
     * bidder - Address
     * escrowAmount - in acceptenToken currency
     */
    function _cancelBid(address _nftAddress, uint256 _assetId) internal {
        Bid memory bid = bidByOrderId[_nftAddress][_assetId];
        delete bidByOrderId[_nftAddress][_assetId];

        // bidding is only with specific Token ( this needs to be updated when we go live to Binance smart chain )
        address tokenAddress = acceptedTokens[bid.tokenSymbol];
        ERC20 acceptedToken = ERC20(tokenAddress);
        if (compareStrings(bid.tokenSymbol, bnb_Symbol)) {
            // Transfer share amount for marketplace Owner
            payable(bid.bidder).transfer(bid.price);
        } else {
            // Transfer accepted token amount minus market fee to seller
            acceptedToken.transfer(bid.bidder, bid.price);
        }

        emit BidCancelled(bid.id);
    }

    function _requireERC721(address _nftAddress)
        internal
        view
        returns (IERC721)
    {
        require(
            IERC721(_nftAddress).supportsInterface(_INTERFACE_ID_ERC721),
            "The NFT contract has an invalid ERC721 implementation"
        );
        return IERC721(_nftAddress);
    }

    function addAcceptedToken(
        address acceptedTokenAddress,
        string memory acceptedTokenSymbol
    ) public onlyOwner returns (bool) {
        acceptedTokens[acceptedTokenSymbol] = acceptedTokenAddress;
        acceptedTokensSymbols.push(acceptedTokenSymbol);
        return true;
    }

    function getTokenSymbols() public view returns (string[] memory) {
        return acceptedTokensSymbols;
    }

    function getTokenAddress(string memory tokenSymbol)
        public
        view
        returns (address)
    {
        return acceptedTokens[tokenSymbol];
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }
}
