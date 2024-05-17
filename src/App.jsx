import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Terms from "./components/terms/Terms";
import CreateNewUserTrip from "./pages/CreateNewUserTrip";
import CreateTripNewUser from "./pages/CreateTripNewUser";
import MainJourneys from "./pages/Journeys";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import { AuthProvider } from "./session/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/create-new-user-trip" element={<CreateNewUserTrip />} />
          <Route path="/journeys" element={<MainJourneys />} />
          <Route path="/create-trip" element={<CreateTripNewUser />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
