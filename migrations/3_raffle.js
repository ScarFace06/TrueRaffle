const Raffle = artifacts.require('Raffle')
const RaffleGiveAway = artifacts.require("RaffleGiveAway")
const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
const TrueRaffleCoin = artifacts.require('TrueRaffleCoin')


module.exports = async (deployer, network, [defaultAccount]) => {

        // For now, this is hard coded to Kovan//
        const trueRaffleCoin = await TrueRaffleCoin.deployed();
        await deployer.deploy(Raffle, '0xa36085F69e2889c224210F603D836748e7dC0088',trueRaffleCoin.address);
        const raffle = await Raffle.deployed();
        await deployer.deploy(RaffleGiveAway, '0xa36085F69e2889c224210F603D836748e7dC0088',trueRaffleCoin.address);
        await trueRaffleCoin.transfer(raffle.address, "1000000000000000000000000");

};
