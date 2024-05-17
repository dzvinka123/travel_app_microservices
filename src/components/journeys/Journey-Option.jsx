import React from 'react';
import placeholder from '../../img/placeholder.png';
import openPreview from '../../img/open_preview.svg';
import "./Journeys.css";

export default function JourneyOption({ onButtonClick, to, from, startDate, endDate }) {
    return (
        <div className="journeys-list-item">
            <img className="journeys-item-image" src={placeholder} alt="Placeholder Image for a journey" />
            <span className="journey-item-country">{to}</span>
            {/* <span className="journey-item-country">{country}</span> */}
            <div className="journey-preview-wrapper">
                <div className="journey-info">
                    <span className="journey-item-destination">Journey from {from} to {to}</span>
                    {/* <span className="journey-item-destination">{title}</span> */}
                    <span className="journey-item-date">{startDate} - {endDate}</span>
                    {/* <span className="journey-item-date">{date}</span> */}
                </div>
                <button className="journeys-button" onClick={onButtonClick}>
                    <img className="journeys-item-preview" src={openPreview} alt="Preview Open Icon" />
                </button>
            </div>
        </div>
    );
}
