import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../../img/eye.png";
import "./FormLogin.css";
import axios from "axios";
import { useAuth } from '../../session/AuthContext';

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("")
  const { login } = useAuth();
  const navigate = useNavigate();
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3002/login`, { email, password })
      .then((response) => {
        setEmail("");
        setPassword("");
        setError("");
        login(response.data);
        navigate("/welcome");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const rememberUser = (e) => {
    // TODO: Implement remember user functionality
  };

  return (
    <div className="middle-item">
      <div className="registration-top">
        <h2>Welcome Back</h2>
        <h5>Enter your credentials to access your account.</h5>
      </div>
      <form className="form-login" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            className="form-row-input"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password:</label>
          <div className="password-row">
            <input
              className="form-row-input"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={togglePassword}
              hidden
            />
            <label htmlFor="show-password">
              <img src={Eye} alt="" />
            </label>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-row terms-and-conditions">
          <input
            type="checkbox"
            id="agree"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="agree">Remember me</label>
        </div>
        <button className="sign-up-button" type="submit">
          Log In
        </button>
      </form>
      <div className="registration-pre-bottom">
        <a href="/forgot-password">Forgot Password?</a>
        <div className="registration-bottom">
          <h2>Don't have an account?</h2>
          <a href="/signup">Create Account</a>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
