import './Journeys.css';
import bro from '../../img/bro.png';

export default function JourneysEmpty() {
  return (
    <section className="journeys-empty">
      <img className="journeys-empty-image" src={bro} alt="A guy riding a car" />
      <h3 className="journeys-empty-text">There are no journeys planned, yet!</h3>
    </section>
  );
}