import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../../img/eye.png";
import "./FormSignUp.css";

function FormSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/" + name + " " + email + " " + password);
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="middle-item">
      <div class="registration-top">
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
            <label for="show-password">
              <img src={Eye} alt="" />
            </label>
          </div>
        </div>
        <div class="form-row terms-and-conditions">
          <input type="checkbox" id="agree" required />
          <label for="agree">
            Agree with company{" "}
            <a href="/terms-and-conditions">terms and conditions.</a>
          </label>
        </div>
        <button className="sign-up-button" type="submit">
          Sign Up
        </button>
      </form>
      <div class="registration-bottom">
        <h2>Already have an Account?</h2>
        <a href="/login">Log In</a>
      </div>
    </div>
  );
}

export default FormSignUp;
