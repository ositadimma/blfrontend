import { Web3 } from 'web3';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react"

// private RPC endpoint
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');

// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');

web3.eth.getBlockNumber().then(console.log);

export default function Wallet() {
Comst [accounts, setAccounts] = useState([]) 
useEffect(() =>{
	getAccounts() 
	}, [] ) 
const navigate = useNavigate();
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
      const response = await axios.post('http://localhost:10000/v1/main/api/get_accounts' 
    );
        Var objArr= [] 
        For(var i=1;i<response.data.length){
        Var balance= await getBalance(response.data.accId);
            
            Var obj= {
                id: response.data.accId,
                balance: balance
            } 
            objArr.push(obj)
            
            
        } 
        SetAccounts(objArr)
        console.log(response.data);
      console.log("successful" );
    } 
      
      // Example usage
    //   const fromAddress = '0xYourSenderAddress';
    //   const toAddress = '0xRecipientAddress';
    //   const privateKey = '0xYourPrivateKey'; // Keep this secure!
    //   const amount = 0.01; // Amount in Ether
      
    //   sendEther(fromAddress, toAddress, privateKey, amount);
      
      
      // Example usage
    //   getBalance('0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'); // Replace with an Ethereum address
        
    return(
        <div className="wallet">
            <div>
                <div className="wallet-container">
                <button onClick={showCreateAccount}>create new account</button>
                <button onClick={showAddAccount}>add account</button>
                    {/* <div>
                    <label>Balance</label>
                        <select style={{float: "right"}}>
                            <option>BTC</option>
                        </select>
                    </div>
                    <div className="balance">
                        2000.00
                    </div> */}
                </div>
                <div>
                    your accounts
                </div>
                <div>
				For(var i=1;i<accounts.length;i++){
                    <div>account id: {accounts[i].id}</div>
                    <div>account id: {accounts[i].id}</div>
                    <div></div>
                }
                </div>
            </div>
            <div>
                
            </div>
            <div>
                
            </div>
        </div>
    )
} 
