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

export default function Lending() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const navigate = useNavigate();
const [loans, setLoans] = useState([])
const [lendings, setLendings] = useState([])
const [accountsLength, setAccountsLength] = useState([])  
const [displayedUserLendings, setDisplayedUserLendings] = useState([]) 
const [displayedAllLendings, setDisplayedAllLendings] = useState([]) 
const [displayedUserLendRequests, setDisplayedUserLendRequests] = useState([]) 

const displayedUserLendRequestsTemp= []

const displayedUserLendingsTemp= []

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
          
          setLendings(response.data.data)
          console.log(response.data);
        console.log("successful" );
      } 
    const getLoans= async () =>{
      const response = await axios.post('http://localhost:10000/v1/main/api/get_loans');
        var objArr= [] 
        
        setLoans(response.data.data)
        console.log(response.data);
      console.log("successful" );
    } 

    const getLoanRequests= async () =>{
        const response = await axios.post('http://localhost:10000/v1/main/api/get_loan_requests');
         setLendings(response.data.data)
          console.log(response.data);
        console.log("successful" );
      } 

      
    const showLoanRequest= async () =>{
        const redirectTo= '/dashboard/loans/loanrequests'
        navigate(redirectTo);
      } 
            
    const showOfferLoan= async () =>{
        const redirectTo= '/dashboard/lendings/offerloan'
        navigate(redirectTo);
    } 
    
    return(
        <div className="wallet">
            <div>
                <div className="wallet-container">
                <button onClick={showOfferLoan}>offer loan</button>
                <button onClick={showLoanRequest}>view loan requests</button> 
                </div>
                <div>
                    Your lendings
                </div>
                <div>
                    Active loan offers
                </div>
                <div>
                <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Loan ID</th>
                      <th>Loaner Adress</th>
                      <th>Amount</th>
                      <th>Loanee Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedUserLendRequests.map((request)=>(
                      <tr>
                      <td>{request.id}</td>
                      <td>{request.accId}</td>
                      <td>{request.amount}</td>
                      <td>{request.loaneeId}</td>
                      <td><button>view details</button></td>
                      </tr>
                    )

                    )}
                  </tbody>
                </table>
                </div>
                <div>
                <div>
      <h2>Loan Details</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Loaner Adress</th>
            <th>Amount</th>
            <th>Loanee Address</th>
          </tr>
        </thead>
        <tbody>
          {displayedUserLendings}
        </tbody>
      </table>
    </div>
                    Active loan requests
                </div>
                {/* <div>{displayedUserLoanRequests}</div> */}
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
