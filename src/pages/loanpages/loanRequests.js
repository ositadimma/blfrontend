import { Web3 } from 'web3';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";

// private RPC endpoint
// const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');
const web3 = new Web3('http://127.0.0.1:7545');
// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');

web3.eth.getBlockNumber().then(console.log);

export default function LoanRequests() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const navigate = useNavigate();
const [loans, setLoans] = useState([])
const [formData, setFormData] = useState({})
const [loanRequests, setLoanRequests] = useState([])
const [loan, setLoan] = useState([])
const [accountsLength, setAccountsLength] = useState([])  
const [displayedUserLoans, setDisplayedUserLoans] = useState([]) 
const [displayedAllLoans, setDisplayedAllLoans] = useState([]) 
const [displayedUserLoanRequests, setDisplayedUserLoanRequests] = useState([]) 

const displayedUserLoanRequestsTemp= []
const showDetails= (id)=>{
    const redirectTo= `/dashboard/loans/loandetails`
    const data= {id: id}
    navigate(redirectTo, {state: data})
}
const displayLoans=(userLoans)=>{
    for(var i=1;i<userLoans.length; i++){
      displayedUserLoanRequestsTemp.push(
          <tr key={userLoans.id}>
              <td>{userLoans.id}</td>
              <td>${userLoans.amount}</td>
              <td>{userLoans.address}</td>
          </tr>
      )
   }
   setDisplayedUserLoans(displayedUserLoanRequestsTemp)
  }


useEffect(() =>{
	// getLoans()
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

    
      const getCurrentLoan= async () =>{
        try{
        const response = await axios.post('http://localhost:10000/v1/main/api/get_loan',
          {},
          {
              headers: {
                'bl_auth_token': cookie.bl_auth_token, 
                'Content-Type': 'application/json',    
              },
              }
        );
          var objArr= [] 
          
          setLoan(response.data.data)
          setAccountsLength(objArr.length)
          displayLoans(objArr)
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
   

    const getLoanRequests= async () =>{
      try{
        const response = await axios.post('http://localhost:10000/v1/main/api/get_all_loan_requests',
            formData,
            {
                headers: {
                  'bl_auth_token': cookie.bl_auth_token, 
                  'Content-Type': 'application/json',    
                },
                }
        );
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
          {loanRequests==0?<h6>No Active Loan Requests</h6>: 
            <div>
                <div>
                <div>
                <h2>Active Loan Requests</h2>
                <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Loanee Address</th>
                      <th>Amount</th>
                      <th>installment </th>
                      <th>start time</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanRequests.map((request)=>(
                      request.completed==true?'':
                      <tr>
                      <td>{request.loaneeAccId}</td>
                      <td>{request.amount}</td>
                      <td>{request.installments}</td>
                      <td>{request.start} month(s)</td>
                      <td>
                        <button onClick={()=>{showDetails(request._id)}}>view details</button>
                        <button>borrower assessment</button>
                      </td>
                      </tr>
                    )

                    )}
                  </tbody>
                </table>
                </div>
                </div>
                <div></div>
            </div>}
            </div>
    )
} 
