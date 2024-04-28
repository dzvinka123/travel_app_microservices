import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '/src/pages/Home';
import Login from '/src/pages/Login';
import CreateTrip from '/src/pages/CreateTrip';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/create-trip" element={<CreateTrip />} />
        </Routes>
    </BrowserRouter>
  );
}