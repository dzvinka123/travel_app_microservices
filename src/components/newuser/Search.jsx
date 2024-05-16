import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Weather from "./Weather";
import Map from "../journeys/Map";
import FormInput from "../formInput/Form-Input";
import PlacesWrapper from "../place-photos/Places-Wrapper";
import ActionButton from "../action-button/ActionButton";
import "./createdTripUser.css";
import { Wrapper } from "@googlemaps/react-wrapper";
import distance from "../../img/distance.svg";
import calendar_clock from "../../img/calendar_clock.svg";

export default function Search({ days, city }) {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/create-new-user-trip/trip-details", {
      state: { ...formData },
    });
  };

  return (
    <Wrapper
      apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_API}
      libraries={["marker", "places"]}
    >
      <section className="search-container">
        <div className="search-div">
          <form className="search-container" onSubmit={handleSubmit}>
            <FormInput
              icon={distance}
              placeholder="Your Location?"
              text="From"
              name="from"
              onChange={handleChange}
            />
            <FormInput
              icon={distance}
              placeholder="Where are you going?"
              text="To"
              name="to"
              onChange={handleChange}
            />
            <FormInput
              icon={calendar_clock}
              placeholder="Add date"
              text="Date"
              name="date"
              onChange={handleChange}
              className="last-field"
            />
            <ActionButton text="Create Your Journey" onClick={handleSubmit} />
          </form>

          <div className="search-elements-div">
            <div className="photo-slider">
              <PlacesWrapper />
            </div>

            <div className="search-map">
              <Map />
            </div>

            <Weather days_range={days} city={city} />
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
