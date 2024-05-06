import React from "react";
import "./createdTripUser.css";

export default function Description() {
    return (
        <div class="description-box">
            <div class="empty"></div>
            <div class="descriptor">
                <div>
                    <h3>Description/Notes</h3>
                </div>
                <div class="descriptor-list">
                    <div>
                        <span>Write your thoughts here</span>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </div>
    );
}