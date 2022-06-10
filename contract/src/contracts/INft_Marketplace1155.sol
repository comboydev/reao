// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface INft_Marketplace1155 {
    struct Order {
        // Order ID
        bytes32 id;
        // Owner of the NFT
        address seller;
        // NFT registry address
        address nftAddress;
        // NFT ID
        uint256 nftId;
        // NFT amount
        uint256 amount;
        // accepted token
        string tokenSymbol;
        // Price for the published item
        uint256 price;
        // Fixed order and auction order   true/false
        // Time when this sale ends
        uint256 expiresAt;
    }

    struct Bid {
        // Bid Id
        bytes32 id;
        // Bidder address
        address bidder;
        // accepted token
        string tokenSymbol;
        // Price for the bid
        uint256 price;
        // Time when this bid ends
        uint256 expiresAt;
    }

    // ORDER EVENTS
    event OrderCreated(
        bytes32 id,
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed assetId,
        uint256 amount,
        string tokenSymbol,
        uint256 priceInWei,
        uint256 expiresAt
    );

    event OrderSuccessful(
        bytes32 id,
        address seller,
        address buyer,
        address indexed nftAddress,
        uint256 indexed assetId,
        uint256 amount,
        string tokenSymbol,
        uint256 priceInWei,
        uint256 timestamp
    );

    event OrderCancelled(bytes32 id);

    // BID EVENTS
    event BidCreated(
        bytes32 id,
        address seller,
        address indexed nftAddress,
        uint256 indexed assetId,
        uint256 amount,
        address indexed bidder,
        string tokenSymbol,
        uint256 price,
        uint256 expiresAt
    );

    event BidAccepted(bytes32 id);
    event BidCancelled(bytes32 id);
}
