import React, { useState, useEffect } from "react";
import { Web3 } from 'web3';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Cookies, useCookies } from "react-cookie";
// const web3 = new Web3('https://mainnet.infura.io/v3/ca7d1e190ff54df69fd7b36adac17e37');
// const web3 = new Web3('http://127.0.0.1:7545');
const SendMoney = () => {
  const [web3, setWeb3] = useState(null);
  const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const [from, setFrom] = useState('');
  const [status, setStatus] = useState('');
const [to, setTo] = useState('');
const [amount, setAmount] = useState('');
const [accounts, setAccounts] = useState([])

const location = useLocation();
const data = location.state;
console.log(data)
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
const navigate = useNavigate();
const [formData, setFormData] = useState({
  accId: '',
  accKey: '',
  amount: '',
  payeeAccId: '',
  from: '',
  hash: ''
});

useEffect(()=>{
  console.log(data)
  setFrom(data.id)
  setTo(formData.payeeAccId)
  setAmount(formData.amount)
  formData.from= data.id
  console.log(formData)
}, [data, formData])

 


  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.payeeAccId.trim()) newErrors.payeeAccId = "Account ID is required.";
    if (!formData.amount.trim()) newErrors.amount = "amount is required.";
    if (!formData.accKey.trim()) newErrors.accKey = "Secret key is required.";
    return newErrors;
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



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

      // Transfer ETH function
      const transferEther = async () => {
        console.log(from)
        console.log(to)
        console.log(amount)
        if (!web3 || !from || !to || !amount) {
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
          formData.hash= tx.transactionHash
          setStatus(`Transaction successful! Hash: ${tx.transactionHash}`);
        } catch (error) {
          setStatus(`Transaction failed: ${error.message}`);
        }
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
      console.log(receipt)
      console.log('Transaction successful:', receipt.transactionHash);
      return receipt.transactionHash

    } catch (err) {
      console.error('Error sending Ether:', err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    const address = '0xYourEthereumAddressHere';
    const isActive= isValidPrivateKey(formData.accKey, data.id)
    // isAccountActive(address).then(active => {
      console.log(isActive)
      console.log(formData)
    // });
    if(isActive){
      if (Object.keys(validationErrors).length === 0) {
        console.log(cookie)
        console.log(cookie.bl_auth_token)
        // const sendMoney= await sendEther(formData.accId, formData.payeeAccId, formData.accKey, formData.amount)
        // formData.trHash=   sendMoney
        transferEther()
        const response = await axios.post(
            'http://localhost:10000/v1/main/api/wallet/send_money',
            formData,{
              headers: {
                'bl_auth_token': cookie.bl_auth_token, // Example of adding an Authorization header
                'Content-Type': 'application/json',    // Example of setting the content type
              },
              }
          );

          console.log(response)
        if(response.data){
          console.log(response.data);
          console.log("Crypto sent successfully", );
          alert("Crypto sent successfully!");
          navigate("/dashboard/wallet");
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


  return (
    <div className="registration-form">
    <h2>Transfer Details</h2>
    <h4>Your Adress: {data.id}</h4>
    <div className="form-group">
      <label>Transfer To address</label>
        <input
          type="text"
          name="payeeAccId"
          value={formData.payeeAccId}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
      <label>Amount</label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
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


      <button type="submit" className="submit-button">Send Crypto</button>
    </form>
  </div>

  );
};

export default SendMoney;
