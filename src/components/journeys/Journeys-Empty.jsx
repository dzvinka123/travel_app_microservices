import React from 'react';
import './Journeys.css';
import bro from '../../img/bro.png';

export default function JourneysEmpty() {
    return (
      <section className="journeys-empty">
        <h2 className="journeys-header">Journeys</h2>
        <div className="journeys-list-empty">
          <img className="journeys-empty-image" src={bro} alt="A guy riding a car" />
          <h3>There are no journeys planned, yet!</h3>
        </div>
      </section>
    );
  }