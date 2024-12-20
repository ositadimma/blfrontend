import React, { useEffect, useState } from "react";
import { Web3 } from 'web3';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from "react-cookie";
// const web3 = new Web3('https://mainnet.infura.io/v3/ca7d1e190ff54df69fd7b36adac17e37');
const web3 = new Web3('http://127.0.0.1:7545');
web3.eth.getBlockNumber().then(console.log);



export default function Home() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
    const [accounts, setAccounts] = useState([]);
    const [currentAccount, setCurrentAccount] = useState('');
    const [balance, setBalance] = useState('');
    const [displayedAccounts, setDisplayedAccounts] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    useEffect(()=>{
        getAccounts()
        
    },[])
    useEffect(()=>{
        if(accounts[0]){
            
            getBalance(currentAccount)
        }
    },[accounts])

    const getBalance = async (address) => {
        try {
            console.log(address)
            if (web3.utils.isAddress(address)) {
                // Await the balance retrieval
                const balance = await web3.eth.getBalance(address);
                console.log(balance)
                const newBalance= web3.utils.fromWei(balance, "ether")
                // Convert balance from Wei to Ether and return as a string
                console.log(newBalance)
                setBalance(newBalance);
              } else {
                throw new Error("Invalid Ethereum address.");
              }
        } catch (err) {
          console.error('Error fetching balance:', err);
        }
      };
      const getAccounts= async () =>{
        const response = await axios.post('http://localhost:10000/v1/main/api/get_accounts', 
            formData,
            {
                headers: {
                  'bl_auth_token': cookie.bl_auth_token, 
                  'Content-Type': 'application/json',    
                },
                }
        );
          var objArr= [] 
          console.log(response.data)
          setAccounts(response.data.data)
          setCurrentAccount(response.data.data[0].accountId)
          getBalance(response.data.data[0].accountId)
          console.log(response.data)
          const data= response.data.data
        
          setDisplayedAccounts(objArr)
          console.log(response.data);
        console.log("successful" );
      }




const handleChange= (newAccount)=>{
    setCurrentAccount(newAccount)
}












    return(
        <div className="home">
            <div>
                <div className="amount-card">
                    <h2>Account Details</h2>
                    <div>
                        <h3>Address: <small>{`${currentAccount}`}</small></h3>
                    <label>Balance</label>
                        <select style={{float: "right"}}
                        id="address"
                        name="address"
                        value={currentAccount}
                        onChange={(e) =>{ handleChange( e.target.value)}}
                        >
                            {accounts.map((account)=>(
                                <option>ETH {`*${account.accountId.slice(account.accountId.length-5, account.accountId.length)}`}</option>
                            ))}
                        </select>
                    </div>
                    <div className="balance">
                        {`${balance}`}
                    </div>
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
            <div>
                
            </div>
            <div>
                
            </div>
        </div>
    )
} 