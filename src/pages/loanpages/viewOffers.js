import { Web3 } from 'web3';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";

// private RPC endpoint
// const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');
const web3 = new Web3('http://127.0.0.1:7545');
// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');


web3.eth.getBlockNumber().then(console.log);

export default function ViewOffers() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const navigate = useNavigate();
const [loans, setLoans] = useState([])
const [loanRequests, setLoanRequests] = useState([])
const [loan, setLoan] = useState([])
const [accountsLength, setAccountsLength] = useState([])  
const [displayedUserLoans, setDisplayedUserLoans] = useState([]) 
const [displayedAllLoans, setDisplayedAllLoans] = useState([]) 
const [displayedUserLoanRequests, setDisplayedUserLoanRequests] = useState([]) 

const location = useLocation();
const data = location.state;
console.log(data)



useEffect(() =>{
    getLoanRequests()
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
    


    const getLoanRequests= async () =>{
        const response = await axios.post('http://localhost:10000/v1/main/api/get_loan_lend_requests',
          {id: data?._id},
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
            
    const viewDetails= async (request) =>{
        const redirectTo= '/dashboard/loans/viewdetails'
        navigate(redirectTo, {state: request} );
    } 
    
    return(
        <div className="wallet">
            <div>
                <div className="wallet-container">
                </div>
                <h3>
                    Loan Offers for you
                </h3>
                <div>
                <div>
                  <h4>Details</h4>
                  <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th>Loanee Address</th>
                        <th>Amount</th>
                        <th>repayment start time</th>
                        <th>action</th>
                        <th>status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanRequests.map((request)=>(
                        <tr>
                          <td>{request.loaneeAccId}</td>
                          <td>{request.amount}</td>
                          <td>{request.start} months</td>
                          <td><button onClick={() =>{viewDetails(request) }} >view Details</button></td>
                          <td>{request.accepted==true?'accepted': 'confirmation pending'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                    Active loan requests
                </div>
                <div>{displayedUserLoanRequests}</div>
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
