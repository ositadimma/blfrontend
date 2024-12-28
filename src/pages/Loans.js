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
    // getCurrentLoan() 
	}, [] ) 

   

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
    const viewDetails= async (singleLoan) =>{
      navigate('/dashboard/loans/viewloandetails', {state: singleLoan})
    
    } 
    const repayLoan= async (singleLoan) =>{
      navigate('/dashboard/loans/repayloan', {state: singleLoan})
    
    } 

    const getLoanRequests= async () =>{
      try{
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
      } catch (err) {
        // Handling errors here
        if (err.response) {
          // The server responded with a status other than 2xx
          if (err.response.status === 400) {
            alert('Bad Request: Invalid data provided');
          } else {
            alert(`Error: ${err.response.status}`);
          }
        } else if (err.request) {
          // The request was made but no response was received
          alert('No response from server');
        } else {
          // Something else went wrong during the setup of the request
          alert('Error: ' + err.message);
        }
      }
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
                <h4>
                   Your Loan Requests
                </h4>
                <div>
                {loanRequests.length==0?<h6>No active loan request</h6>:
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
                </div>}
                <h4>Your Loans</h4>
                </div>
                {loans?.length==0?<h6>No active loans</h6>:
                <div>
                  <h4>Your active loans</h4>
                    <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                      <th>Loaner Address</th>
                        <th>Loanee Address</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans?.map((loan)=>(
                        <tr>
                          <td>{loan.loanerAccId}</td>
                          <td>{loan.loaneeAccId}</td>
                          <td>{loan.amount}</td>
                          <td>
                            <button onClick={()=>viewDetails(loan)}>view details</button>
                            <button onClick={()=>repayLoan(loan)}>Repay Loan</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>}
                <div>
                  <h4>Your Loan History</h4>  
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
