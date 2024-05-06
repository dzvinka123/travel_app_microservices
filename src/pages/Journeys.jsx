import Navbar from "../components/navbar/Navbar";
import JourneysGreeting from "../components/journeys/Journeys-Greeting";
import JourneysEmpty from "../components/journeys/Journeys-Empty";
import JourneysActive from "../components/journeys/Journeys-Active";
import JourneysPending from "../components/journeys/Journeys-Pending";
import Footer from "../components/footer/Footer";

export default function MainJourneys() {
    return (
      <main className="main-journeys">
        <Navbar />
        <JourneysGreeting />
        <JourneysEmpty />
        <JourneysActive />
        <JourneysPending />
        <Footer />
      </main>
    );
}
