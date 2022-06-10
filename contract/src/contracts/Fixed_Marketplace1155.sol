// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "./interface/RoyaltyFactory.sol";
import "./INft_Marketplace1155.sol";
import "./FeeManager.sol";

contract Fixed_Marketplace1155 is
    INft_Marketplace1155,
    FeeManager,
    IERC1155Receiver
{
    using SafeMath for uint256;
    string internal nft_symbol = "SymbolHere";
    string bnb_Symbol = "BNB";

    // From ERC721 registry assetId to Order (to avoid asset collision)
    mapping(bytes32 => Order) orderById;

    mapping(string => address) acceptedTokens;

    // array that saves all the symbols of accepted tokens
    string[] public acceptedTokensSymbols;

    constructor() {}

    // 721 Interfaces
    bytes4 public constant _INTERFACE_ID_ERC1155 = 0xd9b67a26;
    bytes4 private constant _INTERFACE_ID_ROYALTY = 0x0760a14c;

    /**
     * Creates a new order
     *  _nftAddress - Non fungible contract address
     *  _assetId - ID of the published NFT
     *  _priceInAnyOfTheSupportedCurrencies - price In Any Of The Supported Currencies
     *  _expiresAt - Duration of the order (in hours)
     */

    function createOrder(
        address _nftAddress,
        uint256 _assetId,
        uint256 _amount,
        string memory _tokenSymbol,
        uint256 _price,
        uint256 _expiresAt
    ) public returns (bytes32) {
        return
            _createOrder(
                _nftAddress,
                _assetId,
                _amount,
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
    function cancelOrder(bytes32 orderID) public {
        Order memory order = orderById[orderID];

        require(order.seller == msg.sender, "Marketplace: unauthorized sender");

        _cancelOrder(orderID);
    }

    /**
     * Executes the sale for a published NFT
     *  nftAddress - Address of the NFT registry
     *  assetId - ID of the published NFT
     *  priceInAnyOfTheFourCurrencies - Order price
     */

    function safeExecuteOrder(bytes32 _orderId) public payable {
        // Get the current valid order for the asset or fail
        Order memory order = _getValidOrder(_orderId);

        /// Check the execution price matches the order price
        require(order.seller != msg.sender, "Marketplace: unauthorized sender");

        if (compareStrings(order.tokenSymbol, bnb_Symbol)) {
            require(order.price == msg.value, "Marketplace: invalid price");
        }
        // market fee to cut
        uint256 saleShareAmount = 0;
        address tokenAddress = acceptedTokens[order.tokenSymbol];
        ERC20 acceptedToken = ERC20(tokenAddress);
        uint256 royaltyFeeAmount = 0;
        if (
            IERC165(order.nftAddress).supportsInterface(_INTERFACE_ID_ROYALTY)
        ) {
            address orignalCreater = RoyaltyFactory(order.nftAddress)
            .getOriginalCreator(order.nftId);
            uint256 royaltyFee = RoyaltyFactory(order.nftAddress).getRoyaltyFee(
                order.nftId
            );
            royaltyFeeAmount = order.price.mul(royaltyFee).div(1e6);
            if (compareStrings(order.tokenSymbol, bnb_Symbol)) {
                // Transfer share amount for marketplace Owner
                payable(orignalCreater).transfer(royaltyFeeAmount);
            } else {
                acceptedToken.transferFrom(
                    msg.sender, //buyer
                    orignalCreater,
                    royaltyFeeAmount
                );
            }
        }
        // Send market fees to owner
        if (FeeManager.cutPerMillion > 0) {
            // Calculate sale share
            saleShareAmount = order.price.mul(FeeManager.cutPerMillion).div(
                1e6
            );

            if (compareStrings(order.tokenSymbol, nft_symbol)) {
                // Transfer half of share amount for marketplace Owner
                acceptedToken.transferFrom(
                    msg.sender, //buyer
                    owner(),
                    saleShareAmount.div(3)
                );
            } else if (compareStrings(order.tokenSymbol, bnb_Symbol)) {
                // Transfer share amount for marketplace Owner
                payable(owner()).transfer(saleShareAmount);
            } else {
                acceptedToken.transferFrom(
                    msg.sender, //buyer
                    owner(),
                    saleShareAmount
                );
            }
        }

        if (compareStrings(order.tokenSymbol, nft_symbol)) {
            // Transfer accepted token amount minus market fee to seller
            uint256 amount = order.price.sub(saleShareAmount.div(3).mul(2)).sub(
                royaltyFeeAmount
            );
            acceptedToken.transferFrom(
                msg.sender, // buyer
                order.seller, // seller
                amount
            );
        } else if (compareStrings(order.tokenSymbol, bnb_Symbol)) {
            // Transfer share amount for marketplace Owner
            payable(order.seller).transfer(
                order.price.sub(saleShareAmount).sub(royaltyFeeAmount)
            );
        } else {
            // Transfer accepted token amount minus market fee to seller
            acceptedToken.transferFrom(
                msg.sender, // buyer
                order.seller, // seller
                order.price.sub(saleShareAmount).sub(royaltyFeeAmount)
            );
        }

        _executeOrder(
            _orderId,
            msg.sender // buyer
        );
    }

    /**
     * Internal function gets Order by nftRegistry and assetId. Checks for the order validity
     * nftAddress - Address of the NFT registry
     * assetId - ID of the published NFT
     */
    function _getValidOrder(bytes32 _orderId)
        internal
        view
        returns (Order memory order)
    {
        order = orderById[_orderId];

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
    function _executeOrder(bytes32 _orderId, address _buyer) internal {
        // remove order
        Order memory order = orderById[_orderId];
        // Transfer NFT asset
        IERC1155(order.nftAddress).safeTransferFrom(
            address(this),
            _buyer,
            order.nftId,
            order.amount,
            ""
        );

        delete orderById[_orderId];
        // Notify ..
        emit OrderSuccessful(
            order.id,
            order.seller,
            _buyer,
            order.nftAddress,
            order.nftId,
            order.amount,
            order.tokenSymbol,
            order.price,
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
        uint256 _amount,
        string memory _tokenSymbol,
        uint256 _price,
        uint256 _expiresAt
    ) internal returns (bytes32) {
        // Check nft registry
        IERC1155 nftRegistry = _requireERC1155(_nftAddress);

        // Check order creator is the asset owner

        require(_price > 0, "Marketplace: Price should be bigger than 0");

        require(
            _expiresAt > block.timestamp.add(1 minutes),
            "Marketplace: Publication should be more than 1 minute in the future"
        );

        // get NFT asset from seller
        nftRegistry.safeTransferFrom(
            msg.sender,
            address(this),
            _assetId,
            _amount,
            ""
        );

        // create the orderId
        bytes32 orderId = keccak256(
            abi.encodePacked(
                block.timestamp,
                _msgSender(),
                _nftAddress,
                _assetId,
                _amount,
                _tokenSymbol,
                _price
            )
        );

        // save order
        orderById[orderId] = Order({
            id: orderId,
            seller: _msgSender(),
            nftAddress: _nftAddress,
            nftId: _assetId,
            amount: _amount,
            tokenSymbol: _tokenSymbol,
            price: _price,
            expiresAt: _expiresAt
        });

        emit OrderCreated(
            orderId,
            _msgSender(),
            _nftAddress,
            _assetId,
            _amount,
            _tokenSymbol,
            _price,
            _expiresAt
        );
        return orderId;
    }

    /**
     * Cancel an already published order
     *  can only be canceled by seller or the contract owner
     * orderId - Bid identifier
     * nftAddress - Address of the NFT registry
     * assetId - ID of the published NFT
     * seller - Address
     */
    function _cancelOrder(bytes32 _orderId) internal {
        Order memory order = orderById[_orderId];
        delete orderById[_orderId];
        /// send asset back to seller
        IERC1155(order.nftAddress).safeTransferFrom(
            address(this),
            order.seller,
            order.nftId,
            order.amount,
            ""
        );
        emit OrderCancelled(_orderId);
    }

    function _requireERC1155(address _nftAddress)
        internal
        view
        returns (IERC1155)
    {
        require(
            IERC165(_nftAddress).supportsInterface(_INTERFACE_ID_ERC1155),
            "The NFT contract has an invalid ERC721 implementation"
        );
        return IERC1155(_nftAddress);
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

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) public virtual override returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155Received(address,address,uint256,uint256,bytes)"
                )
            );
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata
    ) public virtual override returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"
                )
            );
    }

    function supportsInterface(bytes4)
        public
        view
        virtual
        override
        returns (bool)
    {
        return false;
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
