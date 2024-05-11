import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../../img/eye.png";
import "./FormLogin.css";

function FormLogin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

  const rememberUser = (e) => {
    // TODO: Implement remember user functionality
  };

  return (
    <div className="middle-item">
      <div class="registration-top">
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
            <label for="show-password">
              <img src={Eye} alt="" />
            </label>
          </div>
        </div>
        <div class="form-row terms-and-conditions">
          <input
            type="checkbox"
            id="agree"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label for="agree">Remember me</label>
        </div>
        <button className="sign-up-button" type="submit">
          Log In
        </button>
      </form>
      <div class="registration-pre-bottom">
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
