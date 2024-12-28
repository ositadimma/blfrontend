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

export default function Lending() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const navigate = useNavigate();
const [loans, setLoans] = useState([])
const [lendings, setLendings] = useState([])
const [lendRequests, setlendRequests] = useState([])
const [loanRequest, setLoanRequest] = useState({})
const [accountsLength, setAccountsLength] = useState([])  
const [displayedUserLendings, setDisplayedUserLendings] = useState([]) 
const [displayedAllLendings, setDisplayedAllLendings] = useState([]) 
const [displayedUserLendRequests, setDisplayedUserLendRequests] = useState([]) 

const displayedUserLendRequestsTemp= []

const displayedUserLendingsTemp= []

useEffect(() =>{
	// getLoans()
    getLendRequests()
    getCurrentLendings()
    // getCurrentLoan() 
	}, [] ) 


	const sendCryp= (request) =>{
    console.log(request)
    navigate('/dashboard/loans/sendloan', {state: request})
		
	} 

      const getCurrentLendings= async () =>{
        const response = await axios.post('http://localhost:10000/v1/main/api/loans/get_my_lendings',
          {},
          {
              headers: {
                'bl_auth_token': cookie.bl_auth_token, 
                'Content-Type': 'application/json',    
              },
              }
        );
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

    const getLendRequests= async () =>{
      const formData= {}
        const response = await axios.post('http://localhost:10000/v1/main/api/get_lend_requests',
          formData,
            {
                headers: {
                  'bl_auth_token': cookie.bl_auth_token, 
                  'Content-Type': 'application/json',    
                },
                }
        );
        setlendRequests(response.data.data)
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

    const viewMyRequestDetails= async (request) =>{
      const formData= {id: request.loanRequest};
navigate('/dashboard/loans/viewdetails', {state: formData})
      } 

      const getLoanRequest= async (request) =>{
        console.log('yh')
        const formData= {id: request.loanId};
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
         var newState= {
          loan: response.data.data,
          lend: request
         }
         navigate('/dashboard/lending/reviewlend', {state: newState})
         console.log(loanRequest)
          console.log(response.data);
        console.log("successful" );
       
        
      } 
    
    
    
    return(
        <div className="wallet">
            <div>
                <div className="wallet-container">
                <button onClick={showOfferLoan}>offer loan</button>
                <button onClick={showLoanRequest}>view loan requests</button> 
                </div>
                <h4>
                    Your Lendings
                </h4>
                {lendRequests.length==0?<h6>No active offers</h6>:
                <div>
                <h4>
                    Active loan offers
                </h4>
                <div>
                <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Loaner Adress</th>
                      <th>Loanee Address</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lendRequests.map((request)=>(request.completed==true?'':
                      <tr>
                      <td>{request.loanerAccId}</td>
                      <td>{request.loaneeAccId}</td>
                      <td>{request.amount}</td>
                      <td>
                        <button onClick={()=>getLoanRequest(request)}>view details</button>
                        {request.accepted==true?<button onClick={()=>sendCryp(request)}>send crypto</button>:''}
                      </td>
                      </tr>
                    )

                    )}
                  </tbody>
                </table>
                </div>
                </div>
                }
                <div>
{lendings.length==0?<h6>No active lending</h6>:
                <div>
      <h4>Loan Details</h4>
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
        {lendings.map((request)=>( request.isActive==false?'':
                      <tr>
                      <td>{request.loanerAccId}</td>
                      <td>{request.loaneeAccId}</td>
                      <td>{request.amount}</td>
                      <td>
                        <button>view details</button>
                        <button>borrower assessment</button>
                      </td>
                      </tr>
                    )

                    )}
        </tbody>
      </table>
    </div>}
    
    <h4>Lending History</h4>
         {loans.length==0?<h4>No Loans Yet</h4>:
         <div>
         <h4>Loan Details</h4>
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
           {lendings.map((request)=>( 
                         <tr>
                         <td>{request.loanerAccId}</td>
                         <td>{request.loaneeAccId}</td>
                         <td>{request.amount}</td>
                         <td><button>view details</button></td>
                         </tr>
                       )
   
                       )}
           </tbody>
         </table>
       </div>}
         
        </div>
        </div>
        </div>
    )
} 
