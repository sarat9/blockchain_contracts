// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);

        console.log("Contract created by:", msg.sender);
        console.log("Amount locked in contract:", msg.value);
        console.log("Unlock time (timestamp):", unlockTime);
        console.log("Contract balance :", address(this).balance);

    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        console.log("withdraw() called by:", msg.sender);
        console.log("Current time:", block.timestamp);
        console.log("Unlock time:", unlockTime);
        console.log("Contract balance before:", address(this).balance);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);

        console.log("Withdrawal successful");
        console.log("Contract balance after:", address(this).balance);
    }
}
