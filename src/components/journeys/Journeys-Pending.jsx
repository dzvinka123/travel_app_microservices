import './Journeys.css';
import JourneyManager from "./Journey-Manager";

export default function JourneysPending() {
    return (
      <section className="journeys-active">
        <h2 className="journeys-header">Pending Journeys</h2>
        <div className="journeys-list">
          <JourneyManager />
        </div>
      </section>
    );
  }