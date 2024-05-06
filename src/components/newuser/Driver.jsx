import React from "react";
import "./createdTripUser.css";
import AddButton from "./AddButton";

export default function Driver({person, plus}) {
    return (
        <div className="driver-cards">
            <div className="driver-card">
                <img className="driver-image" src={person} alt="Person`s photo" />
                    <div className="driver-info">
                        <h5>Volodymyr</h5>
                        <span>01:20 am - 05:30 am</span>
                    </div>
            </div>
            <span>$ 570.00</span>
            <AddButton plus={plus}/>
        </div>
    );
}