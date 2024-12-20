import { Web3 } from 'web3';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";

// private RPC endpoint
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');

// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');

web3.eth.getBlockNumber().then(console.log);

export default function Lending() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  const navigate = useNavigate();
const [accounts, setAccounts] = useState([])
const [accountsLength, setAccountsLength] = useState([])  
const [displayedUserLendings, setDisplayedUserLendings] = useState([]) 
const [displayedUserLendRequests, setDisplayedUserLendRequests] = useState([]) 

const displayedUserLendingRequestsTemp= []
const displayLendingOffers=(userRequests)=>{
  for(var i=1;i<userRequests.length; i++){
    displayedUserLendingRequestsTemp.push(
      <div>
              <div>account address: {userRequests[i].id}</div>
              <div>account id: {userRequests[i].id}</div>
              <div></div>
      </div>
    )
 }
 setDisplayedUserLendRequests(displayedUserLendingRequestsTemp)
}

useEffect(() =>{
	displayLendingOffers() 
	}, [] ) 

    const showCreateAccount= ()=>{

    }

    const showAddAccount= ()=>{
        const redirectTo= '/dashboard/wallet/addaccount'
        navigate(redirectTo);
    }
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
    const getAccounts= async () =>{
      const response = await axios.post('http://localhost:10000/v1/main/api/get_accounts');
        var objArr= [] 
        for(var i=1;i<response.data.length; i++){
        var balance= await getBalance(response.data.accId);
            
            var obj= {
                id: response.data.accId,
                balance: balance
            } 
            objArr.push(obj)
            
            
        } 
        
        setAccounts(objArr)
        setAccountsLength(objArr.length)
        displayAccounts(objArr)
        console.log(response.data);
      console.log("successful" );
    } 
    
    return(
        <div className="wallet">
            <div>
                <div className="wallet-container">
                <button onClick={showCreateAccount}>Browse Loan Requests</button>
                <button onClick={showAddAccount}>offer lending</button>
                </div>
                <div>
                    Your Lendings
                </div>
                <div>
                    Active Lendings
                </div>
                <div>{displayedUserLendings}</div>
                <div>
                    Active Lending offers
                </div>
                <div>{displayedUserLendRequests}</div>
                <div>
                    Lending History
                </div>
                {/* <div>{displayedAccounts}</div> */}
            </div>
            <div>
                
            </div>
            <div>
                
            </div>
        </div>
    )
} 
