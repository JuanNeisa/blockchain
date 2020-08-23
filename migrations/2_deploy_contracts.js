var Mercado = artifacts.require("./Mercado.sol");

module.exports = function(deployer) {
    deployer.deploy(Mercado);
};