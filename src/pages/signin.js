import React, { useState } from "react";
import '../styles/authStyle.css'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Login Successful", formData);
      alert("Login Successful!");
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
