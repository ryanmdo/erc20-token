pragma solidity ^0.4.23;

contract pepeToken{

    string public name = "PEPE TOKEN";
    string public symbol = "PEPE";


    uint256 public totalSupply;
    mapping(address=>uint256) public balanceOf; 

    //address and uint256 are key:value pairs
    //they are like functions
    //balanceOF is a public variable of the contract

    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }


    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );


    //to, value, and from, it also must be publicly accessible and return a status of success
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        Transfer(msg.sender, _to, _value);
        return true; //only calls if the require was success first
    }


}