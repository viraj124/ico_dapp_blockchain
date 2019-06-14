var ICOContract = artifacts.require('./ICOContract.sol');
var CrowdSaleContract = artifacts.require('./CrowdSaleContract.sol');

module.exports = function(deployer) {
deployer.deploy(ICOContract,1000000);
deployer.deploy(CrowdSaleContract);
};





























