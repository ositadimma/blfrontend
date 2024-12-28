import React, { useEffect, useState } from 'react';
import { Web3 } from 'web3';
import contractABI from '../abis/RepayLoan.json'

const TestWallet = () => {
  const [contract, setContract] = useState(null);
  const [loanStatus, setLoanStatus] = useState({ remainingAmount: 0, paidOff: false });
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [repaymentInterval, setRepaymentInterval] = useState(null);
  const web3 = new Web3('http://127.0.0.1:7545');

  const contractAddress = '0x48358f82C36a379E9F630Cd56FbC25b4a5A72cAF';
  const instance = new web3.eth.Contract(contractABI.abi, contractAddress);
  // Replace with actual contract address
//   const contractABI = [/* Contract ABI here */];
  useEffect(()=>{
    setContract(instance);
    console.log(instance) 
  }, [])
  useEffect(() => {
    const initWeb3 = async () => {
    // setWeb3(new Web3('http://127.0.0.1:7545'))
         // Connect to Ganache
        // const accounts = await web3.eth.getAccounts();
        // setAccount(accounts[0]);

        
    };
    
    initWeb3();
    
    // Start the cron-like job when the component mounts
    const interval = setInterval(() => {
      makeRepayment();
    }, 30 * 1000); // Every 30 days (in milliseconds)
    setRepaymentInterval(interval);
    
    // Cleanup the interval on component unmount
    return () => {
      if (repaymentInterval) {
        clearInterval(repaymentInterval);
      }
    };
  }, []);
  
  const getLoanStatus = async () => {
    if (contract) {
      const status = await contract.methods.loanStatus().call();
      setLoanStatus({ remainingAmount: web3.utils.fromWei(status[0], 'ether'), paidOff: status[1] });
    }
  };

  const makeRepayment = async () => {
    if (isLoading || loanStatus.paidOff) return; // Avoid multiple repayments or when the loan is paid off
    
    setIsLoading(true);
    //accounts[1]; // Use the second account as borrower
  // const borrower = ''
    // const accounts = await web3?.eth.getAccounts();
    const accounts = [ '0x8079f48614dabCf2cC9Ef1a708220cba3089B824', '0x1C76ff5635ae1fa337e87FCd42334CAF4887676C'];
    const amountToRepay = web3?.utils.toWei('1', 'ether'); // Repayment amount of 1 ETH

   console.log(contract)


    try {
      await contract.methods.makeRepayment().send({
        from: accounts[0],
        value: amountToRepay,
      });

      getLoanStatus(); // Update loan status after the repayment
      console.log('Repayment successful');
    } catch (error) {
      console.error('Error during repayment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Loan Repayment</h1>
      <button onClick={getLoanStatus} disabled={isLoading}>Check Loan Status</button>
      <div>
        <p>Remaining Amount: {loanStatus.remainingAmount} ETH</p>
        <p>Loan Paid Off: {loanStatus.paidOff ? 'Yes' : 'No'}</p>
      </div>
      <button onClick={makeRepayment} disabled={isLoading || loanStatus.paidOff}>Make Repayment</button>
    </div>
  );
};

export default TestWallet;
