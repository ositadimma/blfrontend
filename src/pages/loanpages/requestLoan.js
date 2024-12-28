import React, { useEffect, useState } from "react";
import { Web3 } from 'web3';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from "react-cookie";
import LoanOptions from "./loanOptions";
// const web3 = new Web3('https://mainnet.infura.io/v3/ca7d1e190ff54df69fd7b36adac17e37');
const web3 = new Web3('http://127.0.0.1:7545');
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

  
  useEffect(() =>{
	getAccounts() 
	}, [] ) 
    // useEffect(() =>{
    //     getAccounts() 
    //     }, [accounts] ) 
  // const handleChange = (event) => {

  //   const { name, value } = event.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  var objArr= [] 
  const getAccounts= async () =>{
    const response = await axios.post('http://localhost:10000/v1/main/api/get_accounts', 
        formData,
        {
            headers: {
              'bl_auth_token': cookie.bl_auth_token, // Example of adding an Authorization header
              'Content-Type': 'application/json',    // Example of setting the content type
            },
            }
    );
      var objArr= [] 
      console.log(response.data)
      setAccounts(response.data.data)
      const data= response.data.data
    
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
          console.log("Loan Request Submitted", );
          alert("Loan Request Submitted");
          navigate("/dashboard/loans");
         } else {
          alert(response.error);
         }
      }  else {
        setErrors(validationErrors)
      } 
    } 
     
   

  return (
    <div className="registration-form">
    <h2>Application Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Amount *</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={(e) =>{ handleChange('amount', e.target.value)}}
        />
        {/* {errors.accId && <p className="error-text">{errors.amount}</p>} */}
      </div>

      <div className="form-group">
      <label >Choose an account *:</label>
      <div>
        {<LoanOptions accounts={accounts} value={formData.account} onChange={handleChange} field='account'/>}
      </div>
        </div>
    <div className="form-group">
      <label >Choose an installment plan *:</label>
        <select
            id="installments"
            name="installments"
            value={formData.installments}
            onChange={(e) =>{ handleChange('installments', e.target.value)}}
            style={{ margin: '10px', padding: '5px' }}
        >
            <option value="" disabled>
            -- Select an Option --
            </option>
            <option value={1}>1 installment</option>
            <option value={3}>3 installments</option>
            <option value={6}>6 installments</option>
            <option value={12}>12 installments</option>
        </select>
        </div>
        <div className="form-group">
      <label >Choose payment start time *:</label>
        <select
            id="start"
            name="start"
            value={formData.start}
            onChange={(e) =>{ handleChange('start', e.target.value)}}
            style={{ margin: '10px', padding: '5px' }}
        >
            <option value="" disabled>
            -- Select an Option --
            </option>
            <option value={1}>1 month</option>
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>1 year</option>
        </select>
        </div>
      <button type="submit" className="submit-button">Apply for Loan</button>
    </form>
  </div>
  
  );
};

export default RequestLoan;
