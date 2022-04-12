require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });


const url = process.env.NEXT_PUBLIC_ALCHEMY_ETH_URL;
const walletKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: url,
      accounts: [walletKey],
    },
  },
};
