import React from 'react';
import placeholder from '../../img/placeholder.png';
import openPreview from '../../img/open_preview.svg';
import "./Journeys.css";

export default function JourneyOption({ onButtonClick }) {
    return (
        <div className="journeys-list-item">
            <img className="journeys-item-image" src={placeholder} alt="Placeholder Image for a journey" />
            <span className="journey-item-country">Country</span>
            <div className="journey-preview-wrapper">
                <div className="journey-info">
                    <span className="journey-item-destination">Journey title</span>
                    <span className="journey-item-date">Date</span>
                </div>
                <button className="journeys-button" onClick={onButtonClick}>
                    <img className="journeys-item-preview" src={openPreview} alt="Preview Open Icon" />
                </button>
            </div>
        </div>
    );
}
