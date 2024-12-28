// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RecurringPayments {
    address public owner;                 // Owner of the contract
    address payable public recipient;    // Address to receive payments
    uint256 public interval;             // Time interval between payments (in seconds)
    uint256 public paymentAmount;        // Amount to send per payment
    uint256 public startTime;            // Time when the schedule starts
    uint256 public numPayments;          // Total number of payments
    uint256 public paymentsMade;         // Counter for payments made

    constructor(
        address payable _recipient,
        uint256 _interval,
        uint256 _paymentAmount,
        uint256 _numPayments
    ) payable {
        require(_recipient != address(0), "Invalid recipient address");
        require(_interval > 0, "Interval must be greater than 0");
        require(_paymentAmount > 0, "Payment amount must be greater than 0");
        require(_numPayments > 0, "Number of payments must be greater than 0");
        require(msg.value >= _paymentAmount * _numPayments, "Insufficient funds");

        owner = msg.sender;               // Set contract owner
        recipient = _recipient;           // Payment recipient
        interval = _interval;             // Interval between payments
        paymentAmount = _paymentAmount;   // Payment amount
        numPayments = _numPayments;       // Total number of payments
        startTime = block.timestamp;      // Start time of payments
        paymentsMade = 0;                 // Initialize payments made
    }

    // Ensure only owner can call certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Function to make payments
    function makePayment() public {
        require(block.timestamp >= startTime + (paymentsMade * interval), "Payment interval not reached");
        require(paymentsMade < numPayments, "All payments completed");

        paymentsMade++; // Increment payments made
        recipient.transfer(paymentAmount); // Send payment
    }

    // Function to check contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to withdraw remaining funds (if any) after payments are complete
    function withdraw() external onlyOwner {
        require(paymentsMade == numPayments, "Payments not completed yet");
        payable(owner).transfer(address(this).balance);
    }

    // Fallback function to receive Ether
    receive() external payable {}
}
