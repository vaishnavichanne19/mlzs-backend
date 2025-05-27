import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8003/api/login",
      { email, password },
      { withCredentials: true }
    );

    if (response.data.success) {
      localStorage.setItem("token", response.data.token); 
      toast.success("Login successful!");
      window.location.href = "/admin";
    } else {
      toast.error(response.data.message || "Login failed.");
    }
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Invalid email or password."
    );
  }
};


  return (
      <div className="register-section">
  <form className="login-form" onSubmit={handleSubmit}>
        <div className="logo-section">
          <img src="new-mlzs-logo.png"/>
        </div>
    <div className="login-input-group">
      <label className="label" htmlFor="email">
        Email
      </label>
      <input
        required
        placeholder="Enter your email"
        name="email"
        id="email"
        type="email"
            value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="login-input-group">
      <label className="label" htmlFor="password">
        Password
      </label>
      <input
        required
        placeholder="Enter your password"
        name="password"
        id="password"
        type="password"
        value={password}
     onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="forgot-password">
      <a href="#">Forgot password?</a>
    </div>
    <button className="submit" type="submit">
      Log In
    </button>
    <div className="signup-link">
      Don't have an account? <a href="/register">Sign up</a>
    </div>
  </form>
  <ToastContainer/>
</div>

  );
};

export default Login;
