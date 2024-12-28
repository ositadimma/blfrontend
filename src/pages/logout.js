import React, { useEffect, useState } from "react";
import { Web3 } from 'web3';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from "react-cookie";
// const web3 = new Web3('https://mainnet.infura.io/v3/ca7d1e190ff54df69fd7b36adac17e37');
const web3 = new Web3('http://127.0.0.1:7545');
web3.eth.getBlockNumber().then(console.log);



export default function LogOut() {
    const [cookie, setCookie] = useCookies(["bl_auth_token"]);
    const navigate = useNavigate();
   
    useEffect(()=>{
        runLogout()
    },[])

    


 const runLogout= ()=>{
    try{
        let expires = new Date();
        expires.setTime(expires.getTime() + 86400 * 1000);
    //   setCookie("bl_auth_token", '', { path: "/", expires,secure: false });
      cookie.bl_auth_token= ''
      alert('you have been logged out')
      navigate('/')
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
        <div>
            <small>logging out</small>
        </div>
    )
} 