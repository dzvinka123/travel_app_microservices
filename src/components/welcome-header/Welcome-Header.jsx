import React from "react";
import logo from "../../img/logo_getaway.png"
import { Link } from "react-router-dom";
import "./Welcome-Header.css"

export default function WelcomeHeader() {
    const path = "/login"
    return (
            <header className="header">
                <div className="header_wrapper">
                    <div className="header__container _container">
                        <div className="header__body">
                            <div href="#" className="header__left">
                                <a href="#" className="header__logo">
                                    <img src={logo} alt=""></img>
                                    <span>getaway</span>
                                </a>
                            </div>
                            <div className="header__right">
                                <Link to={path} className="header__loginbutton">Log in</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
    );
  }