import './Journeys.css';
import campingDark from '../../img/camping-dark.svg';

export default function JourneysGreeting({ activeButton, setActiveButton }) {
  return (
    <section className="journeys-greeting">
      <h3 className="journeys-greeting-text">Hi, UserName! Your Adventures Await!</h3>
      <div className="journeys-buttons">
        <button
          className={`journeys-greeting-button ${activeButton === 'active' ? 'active' : ''}`}
          id="active-button"
          onClick={() => setActiveButton('active')}
        >
          <img className="journeys-greeting-icon" src={campingDark} alt="Camping Icon" />
          <span>Active</span>
        </button>
        <button
          className={`journeys-greeting-button ${activeButton === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveButton('pending')}
        >
          <img className="journeys-greeting-icon" src={campingDark} alt="Camping Icon" />
          <span>Pending</span>
        </button>
      </div>
    </section>
  );
}
