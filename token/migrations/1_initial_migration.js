var Migrations = artifacts.require("./Migrations.sol");



module.exports = function(deployer) {
  deployer.deploy(Migrations);
};


//This is the supposed one-time use set of functions that basically creates the contract on the ethereum blockchain
