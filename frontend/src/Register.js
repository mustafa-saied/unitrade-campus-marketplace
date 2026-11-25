import React, { useState } from 'react';

const API_URL = "http://localhost:5000/api";

function Register({ setPage }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    try {
      if (form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch(API_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
      });

      setMessage("Account created successfully! You can login now.");

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <h2>Join UniTrade</h2>
          <p>Campus Marketplace for Students</p>
        </header>

        <div className="message-box">{message}</div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>University Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@std.cu.edu.eg"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="ENTER YOUR PHONE NUMBER"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary">Create Account</button>
        </form>

        <footer className="auth-footer">
          <p>Already have an account? <button type="button" className="btn-link" onClick={() => setPage("login")}>Login here</button></p>
        </footer>
      </div>
    </div>
  );
}

export default Register;
