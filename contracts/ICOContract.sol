pragma solidity ^0.5.0;

contract ICOContract {
string public name = "Viraz Token";
string public symbol = "VIR";
string public standard = "Viraz Token v1.0";
uint public totalSupply;

mapping(address => uint) public balanceOf;

mapping(address => mapping(address => uint)) public allowance;

constructor(uint _initialSupply) public {
    totalSupply = _initialSupply;
    balanceOf[msg.sender] = _initialSupply;
}
event Approval(
    address sender,
    address spender,
    uint amount
);
event Transfer(
    address from,
    address to,
    uint amount
);


function transfer(address _to, uint amount) public  returns (bool) {
require(balanceOf[msg.sender] >= amount);
balanceOf[msg.sender] -= amount;
balanceOf[_to] += amount;
emit Transfer(msg.sender, _to, amount);
return true;
}



function approve(address _spender, uint amount) public returns (bool) {
  allowance[msg.sender][_spender] = amount;
  emit Approval(msg.sender,_spender,amount);
  return true;
}

function transferFrom(address _owner, address _spender, uint amount) public returns (bool){
    require(balanceOf[_owner]>=amount);
    require(allowance[_owner][_spender]>=amount);
    balanceOf[_owner] -= amount;
    balanceOf[_spender] += amount;
    allowance[_owner][_spender] -= amount;
    emit Transfer(_owner, _spender, amount);
    return true;
}
}