var pepeToken = artifacts.require("./pepeToken.sol");


module.exports = function(deployer) {
  deployer.deploy(pepeToken, 9000);
};


//This is the supposed one-time use set of functions that basically creates the contract on the ethereum blockchain
