import { Web3 } from 'web3';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";

// private RPC endpoint
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');

// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');

web3.eth.getBlockNumber().then(console.log);

export default function ViewDetails() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const navigate = useNavigate();
const [loans, setLoans] = useState([])
const [currentLoan, setCurrentLoan] = useState({})

const [lendings, setLendings] = useState([]) 
const [dataState, setDataState] = useState({}) 
const [paymentDates, setPaymentDates] = useState([])
const [loanRequests, setLoanRequests] = useState([])
const [loanRequest, setLoanRequest] = useState({})
const [accountsLength, setAccountsLength] = useState([])  
const [displayedUserLendings, setDisplayedUserLendings] = useState([]) 
const [displayedAllLendings, setDisplayedAllLendings] = useState([]) 
const [displayedUserLendRequests, setDisplayedUserLendRequests] = useState([]) 
const {id}= useParams();

const displayedUserLendRequestsTemp= []

const displayedUserLendingsTemp= []
const today= new Date()
const location = useLocation();
const data = location.state;
const month = today.getMonth() + 1; // Months are 0-indexed (0 = January), so add 1
const day = today.getDate(); // Get the day of the month (1-31)
const year = today.getFullYear(); 

// useEffect(() => {
//   getData()
// }, [dataState]);
useEffect(() =>{
	getLoans()
    getLoanRequest()
    getLoanRequests()
    // getData()
  
	}, [] ) 
  // const getData= ()=>{
  //   if (data) {
  //     const n = data.installments; // Replace with your desired number
  //     const numbers = Array.from({ length: n }, (_, i) => i + 1);
  //     let installments = [];
  //     for (let i = 0; i < data.installments; i++) {
  //         installments = [...installments, i + 1];
  //     }
  //     setPaymentDates(installments); // Update state only once when 'data' changes
  // }
  // }

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
      const getDetails= async () =>{
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
      } 

      
    const showLoanRequest= async () =>{
        const redirectTo= '/dashboard/loans/loanrequests'
        navigate(redirectTo);
      } 
            
    const acceptOffer =async () =>{
	      const response = await axios.post('http://localhost:10000/v1/main/api/loans/accept_offer', 
						{id: data?._id},
						{headers: {
                  'bl_auth_token': cookie.bl_auth_token, 
                  'Content-Type': 'application/json',    
                }})
          
          console.log(response.data);
        alert("offer accepted" );
        const redirectTo= '/dashboard/loans'
        navigate(redirectTo);
    } 
    
    return(
        <div className="wallet">
            <div>
                <div>
                    Loan Application Details
                </div>
                <div>Loanee Crypto Address: {`${data?.loaneeAccId}`}</div>
	        <div>amount: {`${data?.amount}`}</div>
                <div>installments: {`${currentLoan.installments}`}</div>
                <div>total payment : {`${parseInt(data?.interest*data?.amount/100)+parseInt(data?.amount)}`}</div>       
	        <div>payment dates</div>
	    <div>
                    {paymentDates.map((payment, index)=>(
                        <div>
                          <div>
                            {`${payment}: `}{`${day}/${(parseInt(month)+parseInt(data?.start)+index)<=12?(parseInt(month)+parseInt(data?.start)+index)+`/${parseInt(year)+1}`:(parseInt(month)+parseInt(data?.start)+index)-12}/${year}`}
                          </div>
                          <div>
                            Amount due: {(parseInt(data?.interest*data?.amount/100)+parseInt(data?.amount))/currentLoan.installments}
                          </div>
                        </div>
                   ))}
                </div>
	    
<div><button onClick={acceptOffer}>Accept Offer</button></div>
                   
            </div>
            
        </div>
    )
} 
