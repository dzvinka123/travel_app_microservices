import React from 'react';
import './Journeys.css';
import placeholder from '../../img/placeholder.png';
import openPreview from '../../img/open_preview.svg';

export default function JourneysActive() {
    return (
      <section className="journeys-active">
        <h2 className="journeys-header">Active Journeys</h2>
        <div className="journeys-list">
          <div className="journeys-list-item">
            <img className="journeys-item-image" src={placeholder} alt="Placeholder Image for a journey" />
            <span className="journey-item-country">Country</span>
            <div className="journey-preview-wrapper">
              <div className="journey-info">
                <span className="journey-item-destination">Journey title</span>
                <span className="journey-item-date">Date</span>
              </div>
              <button className="journeys-button">
                <img className="journeys-item-preview" src={openPreview} alt="Preview Open Icon" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }