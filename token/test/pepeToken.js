//I believe that we are trying to run a set function on the totalSupply
var pepeToken = artifacts.require('./pepeToken.sol')


contract('pepeToken', function(accounts) { //we are graabbing the pepToken somehow

    it('initializes the contract with the correct values', function(){
        return pepeToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name,'PEPE TOKEN', 'check for the proper name')
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol,'PEPE','check for the proper symbol')
        })
    });



    it('sets the total supply upon deployment', function(){
        //Just like in the console, I have to runb some callback function to get the deployed contract
        return pepeToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 9000,'set total supply to 9000')
            //this is needlessly complicated for setting a number
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(), 9000,'this sets the admin supply to 9000')            
        });
    });



    it('transfers token ownership', function(){
        return pepeToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[0],999999999999999999999);
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1], 900, {from: accounts[0] });
            // the .call after tranfer doesn't actually make the transfer happen, but it gets the returned value
        }).then(function(success) {
            assert.equal(success, true, "it returns true");
            return tokenInstance.transfer(accounts[1], 900, {from: accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length,1,"triggers one event only")
            assert.equal(receipt.logs[0].event,"Transfer",'Transfer should be the Transfer event')
            assert.equal(receipt.logs[0].args._from,accounts[0],'logs the account the tokens are transfered from')
            assert.equal(receipt.logs[0].args._to,accounts[1],'logs the account the tokens were transfered tp')
            assert.equal(receipt.logs[0].args._value,900,'logs the transfered amount')
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance.toNumber(),900,'add amount to receiving accont');
            return tokenInstance.balanceOf(accounts[0])
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 8100, 'subtracts from sender');
        });



    });




    it('approves token transfer', function(){
        return pepeToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function(success){
            assert.equal(success, true, 'check for proper approval')
            return tokenInstance.approve(accounts[1], 100, { from: accounts[0]});
        }).then(function(receipt){
            // console.log(receipt.logs)
            assert.equal(receipt.logs.length,1,'');
            assert.equal(receipt.logs[0].event,'Approval','assert proper event "Approval"');
            assert.equal(receipt.logs[0].args._owner,accounts[0],'assert proper logging of address of owner');
            assert.equal(receipt.logs[0].args._spender,accounts[1],'assert proper logging of address of spender');
            assert.equal(receipt.logs[0].args._value,100,'assert proper logging of value');
            // return tokenInstance.allowance(accounts[0],accounts[1]);
        })
    
    
    
    });




    it('handles delegated token transfers', function() {
        return pepeToken.deployed().then(function(instance) {
            tokenInstance = instance;
            fromAccount = accounts[2];
            toAccount = account[3];
            spendingAccount= account[4];
            return tokenInstance.transfer(fromAccount, 100, {fromt: accounts[0]});
        }).then(function(receipt){
            return tokenInstance.approve(spendingAccount, 10, {from: fromAccount})
        }).then(function(receipt){
            return tokenInstance.transferFrom(fromAccount, toAccount, 99999999, {from: spendingAccount})
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'assert that it cannot transfer larger than balance');
            return tokenInstance.transferFrom(fromAccount,toAccount,50,{from: spendingAccount});
        }).then(assert.fail).catch(function(error){
            console.log(error)
            assert(error.message.indexOf('revert') >= 0, 'assert that it cannot transfer larger than approved amount');
            return tokenInstance.transferFrom.call(fromAccount,toAccount, 10, {from: spendingAccount});
        }).then(function(success){
            console.log(success)
        });
    
    });
    
});