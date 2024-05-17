import './Journeys.css';
import campingWhite from '../../img/camping-white.svg';
import { AuthContext } from '../../session/AuthContext';
import { useContext } from 'react';
export default function JourneysGreeting({ fetchActive, fetchPending, activeButton, userName }) {
  const { user } = useContext(AuthContext);
  return (
    <section className="journeys-greeting">
      <h3 className="journeys-greeting-text">Hi, {userName}! Your Adventures Await!</h3>
      <div className="journeys-buttons">
        <button
          className={`journeys-greeting-button ${activeButton === 'active' ? 'active' : ''}`}
          id="active-button"
          onClick={() => {
            fetchActive();
          }}
        >
          <img className="journeys-greeting-icon" src={campingWhite} alt="Camping Icon" />
          <span>Active</span>
        </button>
        <button
          className={`journeys-greeting-button ${activeButton === 'pending' ? 'active' : ''}`}
          onClick={() => {
            fetchPending();
          }}
        >
          <span>Pending</span>
        </button>
      </div>
    </section>
  );
}
