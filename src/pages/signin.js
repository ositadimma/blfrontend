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
      const response = await axios.post('http://localhost:10000/v1/auth/api', formData)
      const redirectTo = '/dashboard';
      // setIsLoading(true);
    // const responseData = await response.json();
    console.log(response.data)
    if (response.data) {
      console.log(response.data)
      setData(response.data)
      console.log(response)
      let expires = new Date();
      expires.setTime(expires.getTime() + 86400 * 1000);
      setCookie("bl_auth_token", response.data.idToken, { path: "/", expires,secure: false });
      // User creation succeeded
      // setAlertMessage('logged in');
      // setAlertType('success');
      // setClassData(responseData.data);
      // let expires = new Date();
      // expires.setTime(expires.getTime() + 86400 * 1000);
      // setCookie("sds_auth_token", responseData.data.idToken, { path: "/", expires,secure: false });
      // setIsLoading(false);
      // setAlertDisplay(true);
      // setAlertDisplay(true);
      // navigation("/profile");
    } else {
      // setAlertMessage('username or password invalid');
      // setAlertType('error');
      // setIsLoading(false);
      // setAlertDisplay(true);
    }
      console.log("Login Successful", response);
      alert("Login Successful!");
      navigate(redirectTo);
      // setNav(nav+1);
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
    <div>{JSON.stringify(data)}</div>
    <button type="submit" className="submit-button">Login</button>
  </form>
  <div className="regtosign"><small>Don't have an account? <a className="authlink"  href="/register">register</a></small></div>
</div>

  );
};

export default SignIn;
