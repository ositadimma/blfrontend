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

export default function ViewDetails() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const navigate = useNavigate();
const [loans, setLoans] = useState([])
const [currentLoan, setCurrentLoan] = useState({})

const [lendings, setLendings] = useState([]) 
const [paymentDates, setPaymentDates] = useState([])
const [loanRequest, setLoanRequest] = useState({})
const [provider, setProvider] = useState(null);
const [signer, setSigner] = useState(null);
const [contract, setContract] = useState(null);
const [balance, setBalance] = useState(0);
const [amount, setAmount] = useState("");
const [recipient, setRecipient] = useState("");

// Connect to MetaMask
// const connectWallet = async () => {
//   if (window.ethereum) {
//     try {
//       // Request account access
//       await window.ethereum.request({ method: "eth_requestAccounts" });

//       const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
//       const web3Signer = web3Provider.getSigner();
//       const deployedContract = new ethers.Contract(
//         CONTRACT_ADDRESS,
//         contractABI.abi,
//         web3Signer
//       );

//       setProvider(web3Provider);
//       setSigner(web3Signer);
//       setContract(deployedContract);
//     } catch (err) {
//       console.error("Wallet connection failed:", err);
//     }
//   } else {
//     alert("MetaMask not found! Please install MetaMask.");
//   }
// };

// Fetch contract balance
// const getBalance = async () => {
//   if (contract) {
//     const balance = await contract.getBalance();
//     setBalance(ethers.utils.formatEther(balance));
//   }
// };

// Execute transfer
// const executeTransfer = async () => {
//   if (contract) {
//     try {
//       const tx = await contract.executeTransfer(ethers.utils.parseEther(amount));
//       await tx.wait();
//       alert("Transfer executed!");
//       getBalance(); // Refresh balance
//     } catch (err) {
//       console.error("Transfer failed:", err);
//     }
//   }
// };

// Update recipient
const updateRecipient = async () => {
  if (contract) {
    try {
      const tx = await contract.updateRecipient(recipient);
      await tx.wait();
      alert("Recipient updated!");
    } catch (err) {
      console.error("Recipient update failed:", err);
    }
  }
};

const {id}= useParams();
const CONTRACT_ADDRESS = "0xYourContractAddressHere"; // Replace with deployed address

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

    // const getBalance = async (address) => {
    //     try {
    //       const balance = await web3.eth.getBalance(address);
    //       console.log(`Balance of ${address}:`, web3.utils.fromWei(balance, 'ether'), 'ETH');
    //     } catch (err) {
    //       console.error('Error fetching balance:', err);
    //     }
    //   };
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

      
    const showLoanRequest= async () =>{
        const redirectTo= '/dashboard/loans/loanrequests'
        navigate(redirectTo);
      } 
            
    const acceptOffer =async () =>{
      try{
      // executeTransfer();
	      const response = await axios.post('http://localhost:10000/v1/main/api/loans/accept_lend_offer', 
						{id: data?._id},
						{headers: {
                  'bl_auth_token': cookie.bl_auth_token, 
                  'Content-Type': 'application/json',    
                }})
          
          console.log(response.data);

        alert("offer accepted" );
        const redirectTo= '/dashboard/loans'
        navigate(redirectTo);
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
                <h4>
                    Loan Application Details
                </h4>
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
                      Amount due: {(parseInt(data?.interest*data?.amount/100)+parseInt(data?.amount))/currentLoan.installments} ETH
                    </div>
                  </div>
            ))}
          </div>  
          <div>
          {data.accepted==true?<h4>Offer accepted</h4>: <button onClick={acceptOffer}>Accept Offer</button>} 
          </div>
                   
            </div>
            {/* <div style={{ padding: "20px" }}>
      <h1>Scheduled Auto Transfer</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <h2>Contract Balance: {balance} ETH</h2>
      <div>
        <h3>Execute Transfer</h3>
        <input
          type="text"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={executeTransfer}>Transfer</button>
      </div>
      <div>
        <h3>Update Recipient</h3>
        <input
          type="text"
          placeholder="New Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <button onClick={updateRecipient}>Update</button>
      </div>
    </div> */}
        </div>
    )
} 







