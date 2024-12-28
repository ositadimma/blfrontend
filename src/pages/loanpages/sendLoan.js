import { Web3 } from 'web3';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";

// private RPC endpoint
// const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');
// const web3 = new Web3('http://127.0.0.1:7545');

// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');

// web3.eth.getBlockNumber().then(console.log);

export default function SendLoan() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
    const [web3, setWeb3] = useState(null);
  const navigate = useNavigate();
const [loans, setLoans] = useState([])
const [currentLoan, setCurrentLoan] = useState({})
const [lendings, setLendings] = useState([])
const [lendRequests, setlendRequests] = useState([])
const [loanRequests, setloanRequests] = useState([])
const [accounts, setAccounts] = useState([])  
const [accountsLength, setAccountsLength] = useState([])  
const [displayedUserLendings, setDisplayedUserLendings] = useState([]) 
const [displayedAllLendings, setDisplayedAllLendings] = useState([]) 
const [displayedUserLendRequests, setDisplayedUserLendRequests] = useState([]) 
const [from, setFrom] = useState('');
const [to, setTo] = useState('');
const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

const displayedUserLendRequestsTemp= []

const location = useLocation();
const data = location.state;
console.log(data)

const [formData, setFormData] = useState({
    accKey: '',
  });
  

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.accKey.trim()) newErrors.accKey = "Secret key is required.";
    return newErrors;
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

useEffect(() =>{
	// getLoans()
    getLoanRequests()
    
    // getCurrentLoan() 
	}, [] ) 







  // Connect to Ganache
  useEffect(() => {
    const connectToGanache = async () => {
      try {
        // Connect to Ganache using HTTP provider
        const web3Instance = new Web3('http://127.0.0.1:7545'); // Ganache RPC server URL
        setWeb3(web3Instance);

        // Get accounts from Ganache
        const ganacheAccounts = await web3Instance.eth.getAccounts();
        setAccounts(ganacheAccounts);
        
        setFrom(data.loanerAccId); // Use the first account as default sender

        setStatus('Connected to Ganache!');
      } catch (error) {
        setStatus(`Error connecting to Ganache: ${error.message}`);
      }
    };

    connectToGanache();
  }, []);

  useEffect(()=>{
    console.log(data)
    setFrom(data.loanerAccId)
    setTo(data.loaneeAccId )
    setAmount(currentLoan.amount)
  }, [data, currentLoan])


























    useEffect(() =>{
        // getLoans()
        getCurrentLoanRequest()
        // getCurrentLoan() 
        }, [data] ) 

    const getBalance = async (address) => {
        try {
          const balance = await web3.eth.getBalance(address);
          console.log(`Balance of ${address}:`, web3.utils.fromWei(balance, 'ether'), 'ETH');
        } catch (err) {
          console.error('Error fetching balance:', err);
        }
      };
	const sendCryp=() =>{
        // const fromAddress= data.loanerAccId
		// const toAddress= data.loaneeAccId 
		// const privateKey=formData.accKey
        
        transferEther()
        
        
        console.log(currentLoan.amount)
		
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
      const getCurrentLoanRequest= async () =>{
        const response = await axios.post('http://localhost:10000/v1/main/api/get_request_loan',
            {id: data.loanId},
            {
                headers: {
                  'bl_auth_token': cookie.bl_auth_token, 
                  'Content-Type': 'application/json',    
                },
                }
            
        );
          var objArr= [] 
          
          setCurrentLoan(response.data.data)
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












    
    
    
    
    function isValidPrivateKey(privateKey, expectedAddress) {
      try {
          // Ensure the private key starts with '0x'
          if (!privateKey.startsWith('0x')) {
              privateKey = '0x' + privateKey;
          }
    
          // Get the public address from the private key
          const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    
          // Compare the derived address with the expected address
          return account.address.toLowerCase() === expectedAddress.toLowerCase();
      } catch (error) {
          console.error('Invalid private key:', error.message);
          return false;
      }
    }
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();









        
        const validationErrors = validate();
        const address = '0xYourEthereumAddressHere';
        const isActive= isValidPrivateKey(formData.accKey, data.loanerAccId)
        // isAccountActive(address).then(active => {
          console.log(isActive)
          console.log(formData)
        // });
        if(isActive){
          if (Object.keys(validationErrors).length === 0) {
            console.log(cookie)
            console.log(cookie.bl_auth_token)
            sendCryp(); 
              const response = await axios.post(
                'http://localhost:10000/v1/main/api/loans/finalize_loan', 
                {id: data._id},{
                  headers: {
                    'bl_auth_token': cookie.bl_auth_token, // Example of adding an Authorization header
                    'Content-Type': 'application/json',    // Example of setting the content type
                  },
                  }
              );
              
              console.log(response)
            if(response.data){
              console.log(response.data);
              console.log("Loan initiated successfully", );
              alert("Loan initiated successfully");
              navigate("/dashboard/lending");
             } else {
              alert(response.error);
             }
          }  else {
            setErrors(validationErrors)
          } 
        } else{
         alert('account not active', 'error')
        }
        
      }  




      // Transfer ETH function
  const transferEther = async () => {
    console.log(from)
    console.log(to)
    console.log(amount)
    if (!web3 || !from || !to || !amount) {
      setStatus('Please fill in all fields!');
      return;
    }

    try {
      // Convert ETH to Wei
      const value = web3.utils.toWei(amount, 'ether');

      // Send transaction
      const tx = await web3.eth.sendTransaction({
        from,
        to,
        value,
        gas: 21000, // Minimum gas for ETH transfer
        gasPrice: web3.utils.toWei('10', 'gwei'), // Example gas price
      });

      setStatus(`Transaction successful! Hash: ${tx.transactionHash}`);
    } catch (error) {
      setStatus(`Transaction failed: ${error.message}`);
    }
  }













       
    
      return (
        <div className="registration-form">
        <h2>Enter Account Secret Key For Transaction</h2>
        <h4>From: {data.loanerAccId}</h4>
        <h4>To: {data.loaneeAccId }</h4>
        <h4>Amount: {currentLoan.amount }</h4>
        
        <form onSubmit={handleSubmit}>
      
          <div className="form-group">
          <label>Secret Key</label>
            <input
              type="text"
              name="accKey"
              value={formData.accKey}
              onChange={handleChange}
            />
          </div>
        
      
          <button type="submit" className="submit-button">Send Loan</button>
        </form>
      </div>
      
      );



































    
    
} 







// return(
//     <div className="wallet">
//         <div>
//             <div className="wallet-container">
//             <button onClick={showOfferLoan}>offer loan</button>
//             <button onClick={showLoanRequest}>view loan requests</button> 
//             </div>
//             <h4>
//                 Your Lendings
//             </h4>
//             {lendRequests.length==0?<h6>No active offers</h6>:
//             <div>
//             <h4>
//                 Active loan offers
//             </h4>
//             <div>
//             <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr>
//                   <th>Loaner Adress</th>
//                   <th>Loanee Address</th>
//                   <th>Amount</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {lendRequests.map((request)=>( 
//                   <tr>
//                   <td>{request.loanerAccId}</td>
//                   <td>{request.loaneeAccId}</td>
//                   <td>{request.amount}</td>
//                   <td>
//                     <button>view details</button>
//                     {request.accepted==true?<button onClick={()=>sendCryp(request)}>send crypto</button>:''}
//                   </td>
//                   </tr>
//                 )

//                 )}
//               </tbody>
//             </table>
//             </div>
//             </div>
//             }
//             <div>
// {lendings.length==0?<h6>No active lending</h6>:
//             <div>
//   <h4>Loan Details</h4>
//   <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
//     <thead>
//       <tr>
//         <th>Loan ID</th>
//         <th>Loaner Adress</th>
//         <th>Amount</th>
//         <th>Loanee Address</th>
//       </tr>
//     </thead>
//     <tbody>
//     {lendings.map((request)=>( 
//                   <tr>
//                   <td>{request.loanerAccId}</td>
//                   <td>{request.loaneeAccId}</td>
//                   <td>{request.amount}</td>
//                   <td><button>view details</button></td>
//                   </tr>
//                 )

//                 )}
//     </tbody>
//   </table>
// </div>}

// <h4>Lending History</h4>
//      {loans.length==0?<h4>No Loans Yet</h4>:
//      <div>
//      <h4>Loan Details</h4>
//      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
//        <thead>
//          <tr>
//            <th>Loan ID</th>
//            <th>Loaner Adress</th>
//            <th>Amount</th>
//            <th>Loanee Address</th>
//          </tr>
//        </thead>
//        <tbody>
//        {lendings.map((request)=>( 
//                      <tr>
//                      <td>{request.loanerAccId}</td>
//                      <td>{request.loaneeAccId}</td>
//                      <td>{request.amount}</td>
//                      <td><button>view details</button></td>
//                      </tr>
//                    )

//                    )}
//        </tbody>
//      </table>
//    </div>}
     
//     </div>
//     </div>
//     </div>
// )
























































