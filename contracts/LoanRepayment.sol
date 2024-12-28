// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanRepayment {
    address public borrower;
    address public lender;
    uint256 public installmentAmount; // Amount to be paid in each installment
    uint256 public totalInstallments; // Total number of installments
    uint256 public paidInstallments; // Installments paid so far
    uint256 public nextPaymentTime; // Time of the next payment
    uint256 public paymentInterval; // Interval in seconds (e.g., 30 days)
    uint256 public endTime; // Time after which no payments are allowed
    bool public isActive = true; // Indicates whether the contract is active

    event PaymentMade(address indexed borrower, uint256 amount, uint256 installmentNumber);
    event LoanCompleted(address indexed borrower);
    event LoanStopped(address indexed borrower);

    // Constructor to initialize the contract
    constructor(
        address _borrower,
        address _lender,
        uint256 _installmentAmount,
        uint256 _totalInstallments,
        uint256 _paymentInterval,
        uint256 _startTime,
        uint256 _endTime
    ) {
        borrower = _borrower;
        lender = _lender;
        installmentAmount = _installmentAmount;
        totalInstallments = _totalInstallments;
        paidInstallments = 0;
        nextPaymentTime = _startTime;
        paymentInterval = _paymentInterval;
        endTime = _endTime;
    }

    // Modifier to check if the caller is the borrower
    modifier onlyBorrower() {
        require(msg.sender == borrower, "Only the borrower can make payments");
        _;
    }

    // Modifier to check if payments are still active
    modifier onlyWhenActive() {
        require(isActive, "Loan has been stopped");
        require(block.timestamp < endTime, "Loan has expired");
        _;
    }

    // Function to make a payment
    function makePayment() external payable onlyBorrower onlyWhenActive {
        require(block.timestamp >= nextPaymentTime, "It's not time for the next payment yet");
        require(msg.value == installmentAmount, "Incorrect payment amount");

        paidInstallments++;
        nextPaymentTime = block.timestamp + paymentInterval; // Schedule next payment

        payable(lender).transfer(msg.value); // Transfer the installment amount to the lender

        emit PaymentMade(borrower, msg.value, paidInstallments);

        // Check if all installments are paid
        if (paidInstallments >= totalInstallments) {
            emit LoanCompleted(borrower);
            isActive = false; // Stop payments after completing all installments
        }
    }

    // Function to stop the loan manually (can be used by borrower or lender)
    function stopLoan() external {
        require(msg.sender == borrower || msg.sender == lender, "Only borrower or lender can stop the loan");
        isActive = false;
        emit LoanStopped(borrower);
    }

    // Function to check the remaining balance
    function remainingInstallments() public view returns (uint256) {
        return totalInstallments - paidInstallments;
    }

    // Function to get the loan status
    function loanStatus() public view returns (string memory) {
        if (!isActive) {
            return "Loan is stopped or completed.";
        }
        if (paidInstallments >= totalInstallments) {
            return "Loan completed.";
        }
        return string(abi.encodePacked("Installments remaining: ", uint2str(remainingInstallments())));
    }

    // Helper function to convert uint256 to string
    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
        }
        return string(bstr);
    }
}
