pragma solidity ^0.4.23;

contract pepeToken{

    string public name = "PEPE TOKEN";
    string public symbol = "PEPE";


    uint256 public totalSupply;
    mapping(address=>uint256) public balanceOf; 

    mapping(address=>mapping(address=>uint256)) public allowed;

    //this is an array of addresses with itss own address-value key-value pait
    //those values are how much the first address is allowing the second address to spend

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

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );


    //to, value, and from, it also must be publicly accessible and return a status of success
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value,"You have not enough funds.");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true; //only calls if the require was success first
    }

    /*  Add the ability for delgated transfer
    *   This is for when a non-token owner is calling the contract
    *   
    *
    *   event Approval
    *   approve
    *   allowance
    *   transferFrom
    */


    function approve(address _spender,uint256 _value)public returns (bool success) {
        //apprently, lots of functions on ethereum need the returns
        //_spender is the one who is approved to spend the value on his behalf
        
        allowed[msg.sender][_spender] = _value;

        emit Approval(msg.sender,_spender,_value);
        return true;


        
    }



    function allowance(address _owner, address _spender) public view returns (uint remaining) {
        
        return allowed[_owner][_spender];
    }


    function transferFrom(address _from, address _to, uint256 _value) public view returns (bool success) {


        require(_value <= balanceOf[_from],"require that tokens exist");
        require(_value <= allowed[_from][msg.sender],"require proper approval for spending tokens");
        //change balance, update allowed, allowance big enough
        //call transfer event
    }
    
}