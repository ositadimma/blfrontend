import React, { useState } from "react";
import '../styles/authStyle.css'
import axios from 'axios';
// import {useHistory} from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    profilePicture: null,
    kycFile: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = "First name is required.";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid 10-digit phone number is required.";
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.kycFile) newErrors.kycFile = "KYC file is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const response = await axios.post('http://localhost:10000/v1/auth/api/register', formData
    );
    console.log(response.data);
    // let history= useHistory()
      console.log("Form submitted successfully", );
      alert("Registration Successful!");
      // setTimeOut(()=>{
      //   history.push('/sign_in')
      // }, 2000)
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="registration-form">
    <h2>Registration Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name *</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        {errors.firstname && <p className="error-text">{errors.firstname}</p>}
      </div>
  
      <div className="form-group">
        <label>Middle Name</label>
        <input
          type="text"
          name="middlename"
          value={formData.middlename}
          onChange={handleChange}
        />
      </div>
  
      <div className="form-group">
        <label>Last Name *</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        {errors.lastname && <p className="error-text">{errors.lastname}</p>}
      </div>
  
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
        <label>Phone *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}
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
  
      <div className="form-group">
        <label>Confirm Password *</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
      </div>
  
      <div className="form-group">
        <label>Date of Birth *</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        {errors.dob && <p className="error-text">{errors.dob}</p>}
      </div>
  
      <div className="form-group">
        <label>Gender *</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="error-text">{errors.gender}</p>}
      </div>
  
      <div className="form-group">
        <label>Profile Picture</label>
        <input type="file" name="profilePicture" onChange={handleChange} />
      </div>
  
      <div className="form-group">
        <label>KYC File (Driver's License/Passport) *</label>
        <input type="file" name="kycFile" onChange={handleChange} />
        {errors.kycFile && <p className="error-text">{errors.kycFile}</p>}
      </div>
  
      <button type="submit" className="submit-button">Register</button>
    </form>
    <div className="regtosign"><small>Already have an account? <a className="authlink" href="/login">sign in</a></small></div>
  </div>
  
  );
};

export default Register;
