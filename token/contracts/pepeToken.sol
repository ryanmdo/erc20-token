pragma solidity ^0.4.23;

contract pepeToken{

    uint256 public totalSupply;

    //Apprently, just by having this public variabl;e, the get function is implicitly created

    constructor() public {
        totalSupply = 9000;
    }


}