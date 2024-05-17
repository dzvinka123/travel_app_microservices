import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import RenderJourneys from "../components/journeys/Render-Journeys";

export default function MainJourneys() {
  return (
    <main className="main-journeys">
      <Navbar />
      <RenderJourneys />
      <Footer />
    </main>
  );
}
