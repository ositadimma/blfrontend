import { Web3 } from 'web3';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";

// private RPC endpoint
// const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');
const web3 = new Web3('http://127.0.0.1:7545');
// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');

web3.eth.getBlockNumber().then(console.log);

export default function LoanDetails() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const navigate = useNavigate();
const [loans, setLoans] = useState([])
const [lendings, setLendings] = useState([])
const [loanRequests, setLoanRequests] = useState([])
const [loanRequest, setLoanRequest] = useState({})
const [accountsLength, setAccountsLength] = useState([])  
const [displayedUserLendings, setDisplayedUserLendings] = useState([]) 
const [displayedAllLendings, setDisplayedAllLendings] = useState([]) 
const [displayedUserLendRequests, setDisplayedUserLendRequests] = useState([]) 
const {id}= useParams();

const displayedUserLendRequestsTemp= []

const displayedUserLendingsTemp= []

const location = useLocation();
const data = location.state;

useEffect(() =>{
	getLoans()
    getLoanRequest()
  
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

      
      const getLoanRequest= async () =>{
        try{
        const formData= {id: data?.id};
        console.log(formData)
        const response = await axios.post('http://localhost:10000/v1/main/api/get_loan_request',
            formData,
            {
                headers: {
                  'bl_auth_token': cookie.bl_auth_token, 
                  'Content-Type': 'application/json',    
                },
                }
        ); 
        console.log(response.data); 
         setLoanRequest(response.data.data)
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
    
    const getLoans= async () =>{
      try{
      const response = await axios.post('http://localhost:10000/v1/main/api/get_loans',
        {},
            {
                headers: {
                  'bl_auth_token': cookie.bl_auth_token, 
                  'Content-Type': 'application/json',    
                },
                }
      );
        var objArr= [] 
        
        setLoans(response.data.data)
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

  
            
    const requestOffer= async () =>{
        const redirectTo= '/dashboard/lendings/offerrequest/'
        navigate(redirectTo, {state: data.id});
    } 
    
    return(
        <div className="wallet">
            <div>
                <div>
                    Loan Application Details
                </div>
                <div>Loanee Crypto Address: {`${loanRequest.loaneeAccId}`}</div>
                <div>amount: {`${loanRequest.installments}`}</div>
                <div>installments: {`${loanRequest.installments}`}</div>
                <div>start date: {`${loanRequest.start} month(s)`}</div>
                <div><button onClick={requestOffer}>Propose loan</button></div>
                   
            </div>
            
        </div>
    )
} 
