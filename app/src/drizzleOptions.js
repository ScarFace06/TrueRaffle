import Web3 from "web3";
import Raffle from "./contracts/Raffle.json"
import TrueRaffleCoin from "./contracts/TrueRaffleCoin.json"
import LinkTokenInterface from './contracts/LinkTokenInterface.json'
import RaffleGiveAway from "./contracts/RaffleGiveAway.json";
require('dotenv').config();

//const url = process.env.RPC_URL_ROPSTEN;
window.web3 = new Web3(window.web3.currentProvider)

const options = {
  web3: {
    block: false
  },
  contracts: [Raffle,TrueRaffleCoin,RaffleGiveAway,
    {
      contractName: "LinkTokenInterface",
      web3Contract: new window.web3.eth.Contract(LinkTokenInterface.abi, '0xa36085F69e2889c224210F603D836748e7dC0088')
    }
  ],
  events: {
    Raffle: ["requestedRaffle"]
  },
};

export default options;
