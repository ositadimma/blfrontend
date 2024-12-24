import { Web3 } from 'web3';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";

// private RPC endpoint
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');

// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');

web3.eth.getBlockNumber().then(console.log);

export default function Loans() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const navigate = useNavigate();
const [loans, setLoans] = useState([])
const [loanRequests, setLoanRequests] = useState([])
const [loan, setLoan] = useState([])
const [accountsLength, setAccountsLength] = useState([])  
const [displayedUserLoans, setDisplayedUserLoans] = useState([]) 
const [displayedAllLoans, setDisplayedAllLoans] = useState([]) 
const [displayedUserLoanRequests, setDisplayedUserLoanRequests] = useState([]) 



useEffect(() =>{
	getLoans()
    getLoanRequests()
    getCurrentLoan() 
	}, [] ) 

    const getBalance = async (address) => {
        try {
          const balance = await web3.eth.getBalance(address);
          console.log(`Balance of ${address}:`, web3.utils.fromWei(balance, 'ether'), 'ETH');
        } catch (err) {
          console.error('Error fetching balance:', err);
        }
      };
	const sendCryp=() =>{
const fromAddress= '' 
		const toAddress= '' 
		const privateKey='' 
		
	} 

      const sendEther = async (fromAddress, toAddress, privateKey, amount) => {
        try {
          const transaction = {
            from: fromAddress,
            to: toAddress,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            gas: 21000, // Standard gas limit for ETH transfer
          };
      
          // Sign the transaction
          const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey);
      
          // Send the signed transaction
          const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
          console.log('Transaction successful:', receipt.transactionHash);
        } catch (err) {
          console.error('Error sending Ether:', err);
        }
      };
      const getCurrentLoan= async () =>{
        const response = await axios.post('http://localhost:10000/v1/main/api/get_loan');
          var objArr= [] 
          
          setLoan(response.data.data)
          setAccountsLength(objArr.length)
          console.log(response.data);
        console.log("successful" );
      } 
    const getLoans= async () =>{
      const response = await axios.post('http://localhost:10000/v1/main/api/get_loans',
        {},
        {
            headers: {
              'bl_auth_token': cookie.bl_auth_token, 
              'Content-Type': 'application/json',    
            },
            }
      );
        
        setLoans(response.data.data)
        console.log(response.data);
      console.log("successful" );
    } 
    const viewOffers= async (request) =>{
      navigate('/dashboard/loans/viewoffers', {state: request})
    } 
    const viewDetails= async () =>{
      navigate('/dashboard/loans/viewloandetails', {state: loan})
    
    } 

    const getLoanRequests= async () =>{
        const response = await axios.post('http://localhost:10000/v1/main/api/get_loan_requests',
          {},
            {
                headers: {
                  'bl_auth_token': cookie.bl_auth_token, 
                  'Content-Type': 'application/json',    
                },
                });
         setLoanRequests(response.data.data)
          console.log(response.data);
        console.log("successful" );
      } 

      
    const showRequestLoan= async () =>{
        const redirectTo= '/dashboard/loans/requestloan'
        navigate(redirectTo);
      } 
            
    const showOfferLoan= async () =>{
        const redirectTo= '/dashboard/wallet/addaccount'
        navigate(redirectTo);
    } 
    
    return(
        <div className="wallet">
            <div>
                <div className="wallet-container">
                <button onClick={showRequestLoan}>request loan</button>
                <button onClick={showOfferLoan}>offer loan</button>
                </div>
                <h2>
                    loans
                </h2>
                <div>
                <div>
                  <h4>Your active Loan Request(s)</h4>
                  <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th>Loanee Address</th>
                        <th>Amount</th>
                        <th>number of installments</th>
                        <th>repayment start time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanRequests.map((request)=>(
                        <tr>
                          <td>{request.loaneeAccId}</td>
                          <td>{request.amount}</td>
                          <td>{request.installments}</td>
                          <td>{request.start} months</td>
                          <td><button onClick={()=>viewOffers(request)}>view offers</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </div>
                <h4>Your active loans</h4>
                <div>
                    <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th>Loanee Address</th>
                        <th>Amount</th>
                        <th>number of installments</th>
                        <th>repayment start time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map((loan)=>(
                        <tr>
                          <td>{loan.loaneeAccId}</td>
                          <td>{loan.amount}</td>
                          <td>{loan.installments}</td>
                          <td><button onClick={viewDetails}>view details</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                    loan History
                </div>
                <div></div>
            </div>
            <div>
                
            </div>
            <div>
                
            </div>
        </div>
    )
} 
