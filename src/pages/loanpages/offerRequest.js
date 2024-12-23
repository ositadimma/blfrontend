import React, { useEffect, useState } from "react";
import { Web3 } from 'web3';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Cookies, useCookies } from "react-cookie";
import LoanOptions from "./loanOptions";
// const web3 = new Web3('https://mainnet.infura.io/v3/ca7d1e190ff54df69fd7b36adac17e37');
const web3 = new Web3('http://127.0.0.1:7545');
const OfferRequest = () => {
  const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const [accounts, setAccounts] = useState([]);
  const [displayedAccounts, setDisplayedAccounts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [formData, setFormData] = useState({
    interest: '',
    start: '',
    accId: '',
    id: ''
  });
  

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.interest.trim()) newErrors.installments = "number of installments is required.";
    if (!formData.start.trim()) newErrors.start = "Payment start time is required.";
    
    return newErrors;
  };
 
  
  useEffect(() =>{
	getAccounts() 
	}, [] ) 
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
    console.log(data)
    formData.id= data
    const redirectTo= '/dashboard/lending/reviewproposal'
    navigate(redirectTo, {state: formData}) 
    } 
     
   

  return (
    <div className="registration-form">
    <h2>Proposal Form</h2>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label >Propose Interest *:</label>
        <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={(e) =>{ handleChange('interest', e.target.value)}}
            style={{ margin: '10px', padding: '5px' }}
        >
            <option value="" disabled>
            -- Select an Option --
            </option>
            <option value={10}>10%</option>
            <option value={20}>20%</option>
            <option value={30}>30%</option>
            <option value={40}>40%</option>
            <option value={50}>50%</option>
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
        <div>
          <label>Select Account to lend from</label>
          {<LoanOptions accounts={accounts} value={formData.accId} onChange={handleChange} field='accId'/>}
        </div>
      <button type="submit" className="submit-button">Review Proposal</button>
    </form>
  </div>
  
  );
};

export default OfferRequest;
