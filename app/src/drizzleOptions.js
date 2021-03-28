import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
require('dotenv').config();

//const url = process.env.RPC_URL_ROPSTEN;

const options = {
  web3: {
    block: false,
    //customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [SimpleStorage],
  events: {
    SimpleStorage: ["StorageSet"],
  },
};

export default options;
