//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract TestToken is ERC20, Ownable {

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowances;

    uint256 _totalSupply = 0;
    address private _owner;

    constructor() ERC20("testToken", "TEST") {
    }

    function mint(address account, uint256 amount) onlyOwner public {
        require(account != address(0), "ERC20: mint to the zero address");
        _totalSupply += amount;
        balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address tokenOwner) public view override returns(uint) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender], "Number of tokens to be transferred surpass the ones in account");
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address sender, uint numTokens) public override returns (bool) {
        allowances[msg.sender][sender] = numTokens; //sender is spender
        emit Approval(msg.sender, sender, numTokens); //sender is spender
        return true;
    }

    function allowance(address _Owner, address spender) public view override returns (uint) {
        return allowances[_Owner][spender];
    }

    function transferFrom(address sender, address receiver, uint numTokens) public override returns (bool) { 
        require(numTokens <= balances[sender],"Number of tokens surpass the tokens in the account");
        if(sender!=msg.sender){
        require(numTokens <= allowances[sender][msg.sender],"Number of tokens exceed the number allowed");
        allowances[sender][msg.sender] = allowances[sender][msg.sender] - numTokens;
        }
        balances[sender] = balances[sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(sender, receiver, numTokens);
        return true;
    }
}