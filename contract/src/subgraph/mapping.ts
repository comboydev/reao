import {
  OrderSuccessful,
  BidCreated,
  BidCancelled,
} from "../../generated/Fixed_Marketplace/Fixed_Marketplace";
import { OrderTransaction, BidTransaction } from "../../generated/schema";

export function handleOrderSuccessful(event: OrderSuccessful): void {
  let order = new OrderTransaction(event.params.id.toHex());
  order.seller = event.params.seller;
  order.buyer = event.params.buyer;
  order.nftAddress = event.params.nftAddress;
  order.assetId = event.params.assetId;
  order.tokenSymbol = event.params.tokenSymbol;
  order.priceInWei = event.params.priceInWei;
  order.timestamp = event.block.timestamp;
  order.save();
}

export function handleBidCreated(event: BidCreated): void {
  let bid = new BidTransaction(event.params.id.toHex());
  bid.seller = event.params.seller;
  bid.bidder = event.params.bidder;
  bid.nftAddress = event.params.nftAddress;
  bid.assetId = event.params.assetId;
  bid.tokenSymbol = event.params.tokenSymbol;
  bid.priceInWei = event.params.price;
  bid.expiresAt = event.params.expiresAt;
  bid.timestamp = event.block.timestamp;
  bid.save();
}

export function handleBidCancelled(event: BidCancelled): void {
  let id = event.params.id.toHex();
  let bid = BidTransaction.load(id);
  bid.remove();
}
