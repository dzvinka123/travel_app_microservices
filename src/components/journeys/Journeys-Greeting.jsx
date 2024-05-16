import './Journeys.css';
import campingWhite from '../../img/camping-white.svg';

export default function JourneysGreeting({ activeButton, setActiveButton, userName }) {
  return (
    <section className="journeys-greeting">
      <h3 className="journeys-greeting-text">Hi, {userName}! Your Adventures Await!</h3>
      <div className="journeys-buttons">
        <button
          className={`journeys-greeting-button ${activeButton === 'active' ? 'active' : ''}`}
          id="active-button"
          onClick={() => setActiveButton('active')}
        >
          <img className="journeys-greeting-icon" src={campingWhite} alt="Camping Icon" />
          <span>Active</span>
        </button>
        <button
          className={`journeys-greeting-button ${activeButton === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveButton('pending')}
        >
          <span>Pending</span>
        </button>
      </div>
    </section>
  );
}
