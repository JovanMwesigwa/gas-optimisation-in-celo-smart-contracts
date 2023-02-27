// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

error Not__EnoughFeesEntered();

contract MyContract {
    address private immutable i_owner;
    uint256 private immutable i_joinFee;

    uint256 private s_balances = 0;

    uint256 private s_count = 0;

    mapping(uint256 => address) private members;

    constructor(address adminAddress, uint256 joinFee_) {
        i_owner = adminAddress;
        i_joinFee = joinFee_;
    }

    function join() public payable {
        if (msg.value < i_joinFee) {
            revert Not__EnoughFeesEntered();
        }

        members[s_count] = msg.sender;

        s_balances += msg.value;
        s_count += 1;
    }

    // View functions
    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getJoinFee() public view returns (uint256) {
        return i_joinFee;
    }

    function getBalances() public view returns (uint256) {
        return s_balances;
    }

    function getCount() public view returns (uint256) {
        return s_count;
    }
}
