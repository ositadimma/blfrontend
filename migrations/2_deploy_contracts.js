const RepayLoan = artifacts.require("RepayLoan");

module.exports = function (deployer, network, accounts) {
  const lender = '0x8079f48614dabCf2cC9Ef1a708220cba3089B824'//accounts[1]; // Use the second account as borrower
  const borrower = '0x1C76ff5635ae1fa337e87FCd42334CAF4887676C'//accounts[1]; // Use the second account as borrower
  const loanAmount = web3.utils.toWei('10', 'ether'); // Loan amount of 10 ETH
  const installmentAmount = web3.utils.toWei('1', 'ether'); // Installment of 1 ETH
  const repaymentSchedule = 10000; // 30 days in seconds

  deployer.deploy(RepayLoan, lender, borrower, loanAmount, installmentAmount, repaymentSchedule);
};
