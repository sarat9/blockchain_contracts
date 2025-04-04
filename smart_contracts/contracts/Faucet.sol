// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Faucet {
    address public owner;
    uint256 public amountToGive = 0.001 ether;

    // Keep track of who already claimed
    mapping(address => bool) public hasClaimed;

    event Claimed(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Anyone can call this to get free ETH (only once)
    function claim() external {
        require(!hasClaimed[msg.sender], "You've already claimed!");

        // Make sure contract has enough balance
        require(address(this).balance >= amountToGive, "Faucet is empty!");

        hasClaimed[msg.sender] = true;

        // Send ETH to the person calling
        payable(msg.sender).transfer(amountToGive);

        emit Claimed(msg.sender, amountToGive);
    }

    // Allow owner to refill the faucet
    receive() external payable {}
}
