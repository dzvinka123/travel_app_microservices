import React from "react";
import "./createdTripUser.css";

export default function Description() {
    return (
        <div className="description-box">
            <div className="empty"></div>
            <div className="descriptor">
                <div>
                    <h3>Description/Notes</h3>
                </div>
                <div className="descriptor-list">
                    <div>
                        <span>Write your thoughts here</span>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </div>
    );
}
