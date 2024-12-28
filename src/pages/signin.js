import React, { useState, useEffect  } from "react";
import { Cookies, useCookies } from "react-cookie";
import axios from 'axios';
import '../styles/authStyle.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';



const SignIn = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(0);
  const [cookie, setCookie] = useCookies(["bl_auth_token"]);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   const redirectTo = '/dashboard';
  //   navigate(redirectTo);
  // }, [navigate, nav]);

  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try{
        const response = await axios.post('http://localhost:10000/v1/auth/api', formData)
        const redirectTo = '/dashboard';
        if (response.data.data) {
          console.log(response.data)
          setData(response.data)
          console.log(response)
          let expires = new Date();
          expires.setTime(expires.getTime() + 86400 * 1000);
          setCookie("bl_auth_token", response.data.data.idToken, { path: "/", expires,secure: false });
          console.log("Login Successful", response);
          alert("Login Successful!");
          navigate(redirectTo);
          // setNav(nav+1);
        } else {
          alert("Invalid username or password");
          // setAlertMessage('username or password invalid');
          // setAlertType('error');
          // setIsLoading(false);
          // setAlertDisplay(true);
        }
      }  catch (err) {
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
     
    
  
     
    } else {
      setErrors(validationErrors);
    }
  };

  return (
<div className="login-form">
  <h2>Login Form</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Email *</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error-text">{errors.email}</p>}
    </div>

    <div className="form-group">
      <label>Password *</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="error-text">{errors.password}</p>}
    </div>
    <button type="submit" className="submit-button">Login</button>
  </form>
  <div className="regtosign"><small>Don't have an account? <a className="authlink"  href="/register">register</a></small></div>
</div>

  );
};

export default SignIn;
