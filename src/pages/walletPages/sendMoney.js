import React, { useState } from "react";
import { Web3 } from 'web3';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from "react-cookie";
// const web3 = new Web3('https://mainnet.infura.io/v3/ca7d1e190ff54df69fd7b36adac17e37');
const web3 = new Web3('http://127.0.0.1:7545');
const SendMoney = () => {
  const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accId: '',
    accKey: '',
    amount: '',
    payeeAccId: ''
  });
  

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.accId.trim()) newErrors.accId = "Account ID is required.";
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
    const isActive= isValidPrivateKey(formData.accKey, formData.accId)
    // isAccountActive(address).then(active => {
      console.log(isActive)
      console.log(formData)
    // });
    if(isActive){
      if (Object.keys(validationErrors).length === 0) {
        console.log(cookie)
        console.log(cookie.bl_auth_token)
        const sendMoney= await sendEther(formData.accId, formData.payeeAccId, formData.accKey, formData.amount) 
        formData.trHash=   sendMoney
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
          console.log("Account added successfully", );
          alert("Account added successfully!");
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
    <div className="form-group">
      <label>Payee address</label>
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
