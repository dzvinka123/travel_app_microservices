import React from "react";
import "./createdTripUser.css";

export default function ToDos({text}) {
    return (
        <div className="todos">
            <input type="checkbox" id="box1" />
            <label for="box1"> {text}</label><br/>
        </div>
    );
}