import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import Raffle from "./contracts/Raffle.json"
import LinkTokenInterface from './contracts/LinkTokenInterface.json'
require('dotenv').config();

//const url = process.env.RPC_URL_ROPSTEN;
window.web3 = new Web3(window.web3.currentProvider)

const options = {
  web3: {
    block: false,
    customProvider: window.web3,
  },
  contracts: [SimpleStorage, Raffle,
    {
      contractName: "LinkTokenInterface",
      web3Contract: new window.web3.eth.Contract(LinkTokenInterface.abi, '0xa36085F69e2889c224210F603D836748e7dC0088')
    }
  ],
  events: {
    SimpleStorage: ["StorageSet"],
    Raffle: ["requestedRaffle","gotWinner"]
  },
};

export default options;
