import React from "react";
import "../../pages/Welcome"
import "./welcome-form-input.css"

export default function WelcomeFormInput({name, placeholder}) {
    return (
        <div className="find__infoblolck">
            <div className="find__name">
                {name}
            </div>
            <input type="text" placeholder={placeholder} className="find__input"></input>
        </div>
    );
  }