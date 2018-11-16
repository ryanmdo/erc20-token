/*
 * I believe that this is truffle's one-time use function that creates the contract
 *
 */

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!



  //This is where the ganache-cli shsould be at loca=lhost:8545


  networks: {
    development: {
      host:"127.0.0.1",
      port: "8545",
      network_id: "*" //this means match any network_id, not sure what a network_+id is though
    }
  }



};
