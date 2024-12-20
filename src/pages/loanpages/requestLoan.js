import React, { useState } from "react";
import { Web3 } from 'web3';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from "react-cookie";
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');
const RequestLoan = () => {
  const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const [accounts, setAccounts] = useState([]);
  const [displayedAccounts, setDisplayedAccounts] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    installments: '',
    start: '',
    account: '',
    amount: '',
  });
  

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.installments.trim()) newErrors.installments = "number of installments is required.";
    if (!formData.start.trim()) newErrors.start = "Payment start time is required.";
    if (!formData.account.trim()) newErrors.account = "Crypto Account address is required.";
    if (!formData.amount.trim()) newErrors.amount = "amount to be borrowed key is required.";
    
    return newErrors;
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getAccounts= async () =>{
    const response = await axios.post('http://localhost:10000/v1/main/api/get_accounts');
      var objArr= [] 
      
      setAccounts(response.data.data)
      const data= response.data.data
      for (let index = 0; index < data.length; index++) {
        const element = array[index];
        objArr.push(<option value="1">1 month</option>) 
      }
      setDisplayedAccounts(objArr)
      console.log(response.data);
    console.log("successful" );
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
    const isActive= isValidPrivateKey(formData.accKey, formData.accId)
    // isAccountActive(address).then(active => {
      console.log(isActive)
      console.log(formData)
    // });
    if(isActive){
      if (Object.keys(validationErrors).length === 0) {
        console.log(cookie)
        console.log(cookie.bl_auth_token)
          const response = await axios.post(
            'http://localhost:10000/v1/main/api/create_loan_request', 
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
    <h2>Account Details</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Amount</label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
        {errors.accId && <p className="error-text">{errors.accId}</p>}
      </div>
      <div className="form-group">
      <label>Installments</label>
        <input
          type="text"
          name="installments"
          value={formData.installments}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
      <label >Choose an account:</label>
        <select
            id="account"
            name="account"
            value={formData.account}
            onChange={(e) => setSelectedOption(e.target.value)}
            style={{ margin: '10px', padding: '5px' }}
        >
            <option value="" disabled>
            -- Select an Option --
            </option>
            {displayedAccounts}
        </select>
        </div>
    <div className="form-group">
      <label >Choose an installment plan:</label>
        <select
            id="installments"
            name="installments"
            value={formData.installments}
            onChange={(e) => setSelectedOption(e.target.value)}
            style={{ margin: '10px', padding: '5px' }}
        >
            <option value="" disabled>
            -- Select an Option --
            </option>
            <option value="Option1">1 installment</option>
            <option value="Option2">3 installments</option>
            <option value="Option3">6 installments</option>
            <option value="Option4">12 installments</option>
        </select>
        </div>
        <div className="form-group">
      <label >Choose payment start time:</label>
        <select
            id="start"
            name="start"
            value={formData.start}
            onChange={(e) => setSelectedOption(e.target.value)}
            style={{ margin: '10px', padding: '5px' }}
        >
            <option value="" disabled>
            -- Select an Option --
            </option>
            <option value="1">1 month</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">1 year</option>
        </select>
        </div>
      <button type="submit" className="submit-button">Add Account</button>
    </form>
  </div>
  
  );
};

export default RequestLoan;
