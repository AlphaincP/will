// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Will{
    address public owner;
    uint public fortune;
    bool public deceased;

    constructor() public payable{
        owner = msg.sender;
        fortune = msg.value;
        deceased = false;
    }

    modifier isDeceased{
        require(deceased == true);
        _;
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    mapping(address => uint) inheritance;
    address payable []  familyWallet;

    function setInheritance(address payable wallet,uint amount) public{
        familyWallet.push(wallet);
        inheritance[wallet] = amount;
    }

    function payout() private {
        for(uint i = 0;i < familyWallet.length;i++){
            familyWallet[i].transfer(inheritance[familyWallet[i]]);
        }
    }

    function hasDeceased() public{
        deceased = true;
        payout();
    }

}