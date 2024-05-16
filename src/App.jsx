import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Terms from "./components/terms/Terms";
import CreateNewUserTrip from "./pages/CreateNewUserTrip";
import CreateTripNewUser from "./pages/CreateTripNewUser";
import MainJourneys from "./pages/Journeys";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TripDetails from "./pages/TripDetails";
import Welcome from "./pages/Welcome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/create-new-user-trip" element={<CreateNewUserTrip />} />
        <Route path="/journeys" element={<MainJourneys />} />
        <Route
          path="/create-new-user-trip/trip-details"
          element={<TripDetails />}
        />
        <Route path="/userpage" element={<CreateTripNewUser />} />
      </Routes>
    </BrowserRouter>
  );
}
