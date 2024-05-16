import './Journeys.css';
import JourneyManager from "./Journey-Manager";

export default function JourneysActive() {
  return (
    <section className="journeys-active">
      <div>
        <h2 className="journeys-header">Active and Completed Journeys</h2>
        {/* Add buttons for slider */}
      </div>
      <div className="journeys-list">
        <JourneyManager />
        <JourneyManager />
        <JourneyManager />
        <JourneyManager />
      </div>
    </section>
  );
}