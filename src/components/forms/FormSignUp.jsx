import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../../img/eye.png";
import "./FormSignUp.css";
import axios from "axios";
import { useAuth } from "../../session/AuthContext";

function FormSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { name, email, password })
      .then(response => {
        setEmail("");
        setPassword("");
        setName("");
        setError("");
        login(response.data)
        navigate("/create-new-user-trip");
      }).catch(error => {
        setError(error.response.data.message);
      });
  };

  return (
    <div className="middle-item">
      <div className="registration-top">
        <h2>Create Account</h2>
        <h5>Enter your credentials to access your account.</h5>
      </div>
      <form className="form-login" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input
            className="form-row-input"
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            ></input>
            <label htmlFor="show-password">
              <img src={Eye} alt="" />
            </label>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-row terms-and-conditions">
          <input type="checkbox" id="agree" required />
          <label htmlFor="agree">
            Agree with company{" "}
            <a href="/terms-and-conditions">terms and conditions.</a>
          </label>
        </div>
        <button className="sign-up-button" type="submit">
          Sign Up
        </button>
      </form>
      <div className="registration-bottom">
        <h2>Already have an Account?</h2>
        <a href="/login">Log In</a>
      </div>
    </div>
  );
}

export default FormSignUp;
