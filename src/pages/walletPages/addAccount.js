import React, { useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const AddAccount = () => {
  const [formData, setFormData] = useState({
    accId: '',
    accKey: '',
    currency: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.accId.trim()) newErrors.accId = "Account ID is required.";
    if (!formData.accKey.trim()) newErrors.accKey = "Secret key is required.";
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
      const response = await axios.post('http://localhost:10000/v1/main/api/add_account', formData
    );
    console.log(response.data);
      console.log("Form submitted successfully", );
      alert("Account added successfully!");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="registration-form">
    <h2>Account Details</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Account Id *</label>
        <input
          type="text"
          name="id"
          value={formData.accId}
          onChange={handleChange}
        />
        {errors.accId && <p className="error-text">{errors.accKey}</p>}
      </div>
  
      <div className="form-group">
        <label>Secret Key</label>
        <input
          type="text"
          name="acckey"
          value={formData.accKey}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Currency</label>
        <input
          type="text"
          name="currency"
          value={formData.cuurrency}
          onChange={handleChange}
        />
      </div>
  
      <button type="submit" className="submit-button">Add Account</button>
    </form>
  </div>
  
  );
};

export default AddAccount;
