const Fixed_Marketplace = artifacts.require("Fixed_Marketplace");
const Auction_Marketplace = artifacts.require("Auction_Marketplace");

module.exports = async function (deployer) {
  await deployer.deploy(Fixed_Marketplace);
  fixed_marketplace = await Fixed_Marketplace.deployed();
  await fixed_marketplace.addAcceptedToken(
    "0x89F2a5463eF4e4176E57EEf2b2fDD256Bf4bC2bD",
    "ACCEPT TOKEN SYMBOL HERE"
  );
  console.log(await fixed_marketplace.getTokenSymbols());
};
