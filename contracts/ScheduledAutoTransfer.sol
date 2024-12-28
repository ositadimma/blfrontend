// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ScheduledAutoTransfer {
    // Variables
    address public owner;
    address public recipient;
    uint256 public limit;
    uint256 public interval;
    uint256 public lastTransferTime;
    uint256 public transferredAmount;

    // Events
    event TransferScheduled(address indexed recipient, uint256 amount, uint256 time);
    event TransferExecuted(address indexed recipient, uint256 amount, uint256 time);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    // Constructor
    constructor(address _recipient, uint256 _limit, uint256 _interval) {
        require(_recipient != address(0), "Invalid recipient address");
        require(_limit > 0, "Limit must be greater than zero");
        require(_interval > 0, "Interval must be greater than zero");

        owner = msg.sender;
        recipient = _recipient;
        limit = _limit;
        interval = _interval;
        lastTransferTime = block.timestamp;
        transferredAmount = 0;
    }

    // Ownership transfer
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    // Deposit Ether into the contract
    receive() external payable {}

    // Execute transfer
    function executeTransfer(uint256 amount) public onlyOwner {
        require(block.timestamp >= lastTransferTime + interval, "Transfer interval has not passed");
        require(transferredAmount + amount <= limit, "Transfer limit exceeded");
        require(address(this).balance >= amount, "Insufficient balance");

        // Update state
        transferredAmount += amount;
        lastTransferTime = block.timestamp;

        // Transfer funds
        payable(recipient).transfer(amount);
        emit TransferExecuted(recipient, amount, block.timestamp);
    }

    // Reset the transferred amount (if required)
    function resetLimit() public onlyOwner {
        transferredAmount = 0;
    }

    // Update recipient address
    function updateRecipient(address _recipient) public onlyOwner {
        require(_recipient != address(0), "Invalid address");
        recipient = _recipient;
    }

    // Update transfer limit
    function updateLimit(uint256 _limit) public onlyOwner {
        require(_limit > 0, "Limit must be greater than zero");
        limit = _limit;
    }

    // Update interval
    function updateInterval(uint256 _interval) public onlyOwner {
        require(_interval > 0, "Interval must be greater than zero");
        interval = _interval;
    }

    // Get contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
