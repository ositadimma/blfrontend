import { Web3 } from 'web3';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../contractConfig.js";

// private RPC endpoint
const web3 = new Web3('http://localhost:7545');

// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');

web3.eth.getBlockNumber().then(console.log);

export default function ViewLoanDetails() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const navigate = useNavigate();
const [loans, setLoans] = useState([])
const [currentLoan, setCurrentLoan] = useState({})
const [installments, setInstallments] = useState([])


const [lendings, setLendings] = useState([]) 
const [paymentDates, setPaymentDates] = useState([])
const [loanRequest, setLoanRequest] = useState({})
const [provider, setProvider] = useState(null);
const [signer, setSigner] = useState(null);
const [contract, setContract] = useState(null);
const [balance, setBalance] = useState(0);
const [amount, setAmount] = useState("");
const [recipient, setRecipient] = useState("");




const displayedUserLendRequestsTemp= []

const displayedUserLendingsTemp= []

const location = useLocation();
const data = location.state;
const loanDate = new Date(data.createdAt);
const today= new Date()
const month = loanDate.getMonth() + 1; // Months are 0-indexed (0 = January), so add 1
const day = loanDate.getDate(); // Get the day of the month (1-31)
const year = loanDate.getFullYear(); 
const thisMonth = today.getMonth() + 1; // Months are 0-indexed (0 = January), so add 1
const thisDay = today.getDate(); // Get the day of the month (1-31)
const thisYear = today.getFullYear(); 

useEffect(() =>{
	getLoans()
    getLoanRequest()
    getLoanRequests()
  
	}, [] ) 
  
	const sendCryp=() =>{
const fromAddress= '' 
		const toAddress= '' 
		const privateKey='' 
		
	} 

     
      
      const getLoanRequest= async () =>{
        const formData= {id: data?._id};
        console.log(formData)
        const response = await axios.post('http://localhost:10000/v1/main/api/get_lend_request',
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

  

    const getLoanRequests= async () =>{
      try{
      const formData= {id: data?.loanId}
        const response = await axios.post('http://localhost:10000/v1/main/api/get_loan_request',
          formData,
          {
              headers: {
                'bl_auth_token': cookie.bl_auth_token, 
                'Content-Type': 'application/json',    
              },
              }
        );
        var temp= []
        for (let index = 0; index < response.data.data.installments; index++) {
          temp = [...temp, index+1];
          
        }
        setPaymentDates(temp)
         setCurrentLoan(response.data.data)
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

      
      const getInstallments= async () =>{
        try{
            const formData= {id: data?._id}
            const response = await axios.post('http://localhost:10000/v1/main/api/get_installments',
                formData,
                {
                    headers: {
                    'bl_auth_token': cookie.bl_auth_token, 
                    'Content-Type': 'application/json',    
                    },
                    }
            );
    
            console.log(response.data);
            setInstallments(response.data.data)
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
        const goBack= ()=>{
            const redirectTo= '/dashboard/loans'
            navigate(redirectTo);
        }
            
    const repayLoan =async () =>{
      try{
      // executeTransfer();
	      
        const redirectTo= '/dashboard/loans/repayloan'
        navigate(redirectTo, {state: data});
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
    
    return(
        <div className="wallet">
            <div>
            <h4>Lender Address: </h4><h6>{data.loanerAccId}</h6>
            <h4>Borrower Address: </h4><h6>{data.loaneeAccId}</h6>
            <h4>Amount Borrowed: </h4><h6>{data.amount}</h6>
            <h4>Total Payable: </h4><h6>{data.totalPayable} ETH</h6>
            <h4>Installments</h4>
            <div>
                {installments.map((installment)=>(
                    <div>
                    <h4>
                        Schedule {installment.schedule}
                    </h4>
                    <h5>Date Due: </h5>
                    <h6>{day/month+installment.schedule/year}</h6>
                    <h5>Amount Due: </h5>
                    <h6>{parseInt(data.totalPayable)/parseInt(data.installments)}</h6>
                    <h5>status: </h5>
                    {/* {(thisYear>year||(thisYear>year&&thisMonth>month)||
(thisYear==year&&thisMonth>month&&thisDay>day)||
(thisYear==year&&thisMonth==month&&thisDay>day)||
(thisYear==year&&thisMonth>month&&thisDay==day))?'Over due': ''
} */}
                    {/* <h6>{thisDay>=day&&thisMonth>=month&&thisYear>=year?'Over due': 'coming'}</h6> */}
                    <h6>{installment.completed=='fulfilled'?'Fulfilled':(thisYear>year||(thisYear>year&&thisMonth>month)||
                    (thisYear==year&&thisMonth>month&&thisDay>day)||
                    (thisYear==year&&thisMonth==month&&thisDay>day)||
                    (thisYear==year&&thisMonth>month&&thisDay==day))? 'Over due': 'pending'}</h6>
                    </div>

                ))}
            </div>
            </div>
	    
<div><button onClick={repayLoan}>Repay Loan</button></div>
<div><button onClick={goBack}>back</button></div>
             
        
        </div>
    )
} 

 {/* loanId: {
                        type: String
                      },
                      schedule: {
                        type: String
                      },
                      amount: {
                        type: String
                      },
                      completed: {
                        type: String
                      },
                      isActive: { type: Boolean, default: true }, */}






