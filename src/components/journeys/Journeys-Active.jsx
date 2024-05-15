import './Journeys.css';
import JourneyManager from "./Journey-Manager";

export default function JourneysActive() {
  return (
    <section className="journeys-active">
      <h2 className="journeys-header">Active and Completed Journeys</h2>
      <div className="journeys-list">
        <JourneyManager />
      </div>
    </section>
  );
}