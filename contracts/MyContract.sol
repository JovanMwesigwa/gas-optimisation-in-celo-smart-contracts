// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    address public owner;
    uint256 public joinFee;

    uint256 public balances = 0;

    address[] public members;

    constructor(address adminAddress, uint256 joinFee_) {
        owner = adminAddress;
        joinFee = joinFee_;
    }

    function join() public payable {
        require(msg.value == joinFee, 'Please pay the join fee to join.');

        members.push(msg.sender);

        balances += msg.value;
    }
}
