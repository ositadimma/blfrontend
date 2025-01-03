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

export default function ReviewProposal() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const navigate = useNavigate();
const [loans, setLoans] = useState([])
const [payments, setPayments] = useState([])
const [lendings, setLendings] = useState([])
const [loanRequests, setLoanRequests] = useState([])
const [loanRequest, setLoanRequest] = useState({})
const [accountsLength, setAccountsLength] = useState([])  
const [displayedUserLendings, setDisplayedUserLendings] = useState([]) 
const [displayedAllLendings, setDisplayedAllLendings] = useState([]) 
const [displayedUserLendRequests, setDisplayedUserLendRequests] = useState([]) 
const {id}= useParams();

const today = new Date(); // Get today's date

const month = today.getMonth() + 1; // Months are 0-indexed (0 = January), so add 1
const day = today.getDate(); // Get the day of the month (1-31)
const year = today.getFullYear(); 

const location = useLocation();
const data = location.state;
console.log(data)

useEffect(() =>{
	// getLoans()
    getLoanRequest()
  
	}, [] ) 
    useEffect(() =>{
        console.log(loanRequest)
        showPaymentDates()
      
        }, [loanRequest] ) 
    

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
        console.log('yh')
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
         console.log(loanRequest)
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
        const response = await axios.post('http://localhost:10000/v1/main/api/get_loan_requests');
         setLendings(response.data.data)
          console.log(response.data);
        console.log("successful" );
      } 

      
    const showLoanRequest= async () =>{
        const redirectTo= '/dashboard/loans/loanrequests'
        navigate(redirectTo);
      } 
            
    const submitRequest= async () =>{
        const formData= {id: loanRequest._id,
            start: data.start,
            interest: data.interest,
            accId: data.accId,
            loaneeAccId: loanRequest.loaneeAccId,
            amount: loanRequest.amount
        };
        console.log(formData)
        const response = await axios.post('http://localhost:10000/v1/main/api/create_lend_request',
            formData,
            {
                headers: {
                  'bl_auth_token': cookie.bl_auth_token, 
                  'Content-Type': 'application/json',    
                },
                }
        ); 
        console.log(response.data); 
        if(response.data.status=='success'){
            alert('proposal submited')
            navigate('/dashboard/lending')
        } else {
            alert(response.data.status)
        }
    } 
    const showPaymentDates= ()=>{
        var monthArray= []
        for (let index = 0; index < loanRequest?.installments; index++) {
            monthArray= [...monthArray, index+1]
        }
        console.log(monthArray)
        setPayments(monthArray)
        console.log(payments)
    }
    return(
        <div className="wallet">
            <div>
                <h2>
                    Loan Proposal Details
                </h2>
                <div>Loanee Address: {`${loanRequest?.loaneeAccId}`}</div>
                <div>amount: {`${loanRequest?.amount}`}</div>
                <div>installments: {`${loanRequest?.installments}`}</div>
                <div>start date: {`${data?.start}`}</div>
                <div>interest: {`${data?.interest}`}%</div>
                <h3>Payments</h3>
                <div>
                    {payments?.map((payment, index)=>(
                       <div>
                        <h4>{`${payment}: `}{`${day}/${(parseInt(month)+parseInt(data?.start)+index)<=12?(parseInt(month)+parseInt(data?.start)+index)+`/${parseInt(year)+1}`:(parseInt(month)+parseInt(data?.start)+index)-12}/${year}`}</h4>
                        <h5>{((parseInt(loanRequest?.amount)*parseInt(data?.interest)/100)+parseInt(loanRequest?.amount))/parseInt(loanRequest?.installments)} ETH</h5>
                        </div>
                   ))}
                </div>
                <div><button onClick={submitRequest}>submit</button></div>
                  
            </div>
            
        </div>
    )
} 
