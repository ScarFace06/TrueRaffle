const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;
const kovan_url = process.env.RPC_URL_KOVAN;
const ropsten_url = process.env.RPC_URL_ROPSTEN;
const eth_key = process.env.ETHERSCAN_API_KEY;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: { // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(mnemonic, kovan_url);
      },
      network_id: '42',
      gas: 4700000
    },

    ropsten:{
      provider: ()=>{
        return new HDWalletProvider(mnemonic, ropsten_url);
      },
      network_id:'3',
    }

  },
  compilers: {
    solc: {
      version: '0.6.12',
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  plugins: [
    'truffle-plugin-verify'
  ]
};
