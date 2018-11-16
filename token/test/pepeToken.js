//I believe that we are trying to run a set function on the totalSupply



var pepeToken = artifacts.require('./pepeToken.sol')


contract('pepeToken', function(accounts) { //we are graabbing the pepToken somehow

    it('sets the total supply upon deployment', function(){
        //Just like in the console, I have to runb some callback function to get the deployed contract
        return pepeToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();

        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 9000000,'set total supply to 9000000')
        })
    })



})