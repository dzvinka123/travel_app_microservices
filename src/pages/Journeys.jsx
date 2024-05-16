import Navbar from "../components/navbar/Navbar";
import JourneysEmpty from "../components/journeys/Journeys-Empty";
import Footer from "../components/footer/Footer";
import RenderJourneys from "../components/journeys/Render-Journeys";
import PlacesApiWrapper from "../components/place-photos/PlacesApiWrapper";

export default function MainJourneys() {
  return (
    <main className="main-journeys">
      <Navbar />
      <RenderJourneys />
      <JourneysEmpty />
      {/* <PlacesApiWrapper /> */}
      <Footer />
    </main>
  );
}
