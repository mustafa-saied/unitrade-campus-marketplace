import React, { useState } from 'react';

const API_URL = "http://localhost:5000/api";

function Login({ setPage, setStudent }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
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
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setStudent(data.user);
      setPage("profile");

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to your UniTrade account</p>
        </header>

        <div className="message-box">{message}</div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>University Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your university email"
              value={form.email}
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

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <footer className="auth-footer">
          <p>Don't have an account? <button type="button" className="btn-link" onClick={() => setPage("register")}>Register now</button></p>
        </footer>
      </div>
    </div>
  );
}

export default Login;
