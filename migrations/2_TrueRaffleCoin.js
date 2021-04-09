const TrueRaffleCoin = artifacts.require('TrueRaffleCoin')

module.exports = async function(deployer, network, accounts) {
// deploy TrueRaffleCoin
await deployer.deploy(TrueRaffleCoin)

}
