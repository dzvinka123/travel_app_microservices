import './Journeys.css';
import JourneyManager from "./Journey-Manager";

export default function JourneysPending() {
  return (
    <section className="journeys-active">
      <div>
        <h2 className="journeys-header">Pending Journeys</h2>
        {/* Add buttons for slider */}
      </div>
      <div className="journeys-list">
        <JourneyManager />
      </div>
    </section>
  );
}