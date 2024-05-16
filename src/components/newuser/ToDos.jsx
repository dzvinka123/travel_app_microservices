import React from "react";
import "./createdTripUser.css";

export default function ToDos({text, id}) {
    return (
        <div className="todos">
            <input type="checkbox" id={id} />
            <label htmlFor={id}> {text}</label><br/>
        </div>
    );
}
