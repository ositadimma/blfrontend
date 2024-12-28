// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RepayLoan {
    address public lender;
    address public borrower;
    uint256 public loanAmount;
    uint256 public installmentAmount;
    uint256 public totalRepaymentsMade;
    uint256 public repaymentSchedule;
    uint256 public startTime;

    bool public loanPaidOff;

    event RepaymentMade(address borrower, uint256 amount, uint256 totalPaid);
    event LoanPaidOff(address borrower, uint256 totalAmountPaid);

    constructor(address _lender, address _borrower, uint256 _loanAmount, uint256 _installmentAmount, uint256 _repaymentSchedule) {
        lender = _lender; // lender is the contract deployer
        borrower = _borrower;
        loanAmount = _loanAmount;
        installmentAmount = _installmentAmount;
        repaymentSchedule = _repaymentSchedule; // in seconds (e.g., 30 days = 30 * 24 * 60 * 60)
        startTime = block.timestamp;
        loanPaidOff = false;
    }

    // Function to make a repayment
    function makeRepayment() public payable {
        require(msg.sender == borrower, "Only the borrower can make repayments.");
        require(!loanPaidOff, "The loan has already been paid off.");
        require(msg.value == installmentAmount, "Incorrect repayment amount.");

        totalRepaymentsMade += msg.value;
        emit RepaymentMade(borrower, msg.value, totalRepaymentsMade);

        // Transfer the repayment amount to the lender immediately
        payable(lender).transfer(msg.value);

        // Check if the loan is paid off
        if (totalRepaymentsMade >= loanAmount) {
            loanPaidOff = true;
            emit LoanPaidOff(borrower, totalRepaymentsMade);
        }
    }

    // View function to check loan status
    function loanStatus() public view returns (uint256 remainingAmount, bool paidOff) {
        remainingAmount = loanAmount - totalRepaymentsMade;
        paidOff = loanPaidOff;
    }

    // Function to get next payment timestamp
    function nextPaymentTime() public view returns (uint256) {
        return startTime + repaymentSchedule * totalRepaymentsMade / installmentAmount;
    }

    // Function to withdraw funds (Only the lender can withdraw)
    function withdraw() public {
        require(msg.sender == lender, "Only the lender can withdraw funds.");
        require(totalRepaymentsMade > 0, "No repayments have been made yet.");

        payable(lender).transfer(address(this).balance);
    }
}
