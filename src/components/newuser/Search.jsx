import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Weather from "./Weather";
import Map from "../journeys/Map";
import FormInput from "../formInput/Form-Input";
import PlacesWrapper from "../place-photos/Places-Wrapper";
import ActionButton from "../action-button/ActionButton";
import "./Search.css";
import distance from "../../img/distance.svg";
import calendar_clock from "../../img/calendar_clock.svg";

import { DateRangePicker } from "react-date-range"; // for date
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'

export default function Search(props) {
  const location = useLocation();
  const { from, to, date } = location.state;

  const [formData, setFormData] = useState({
    from: from,
    to: to,
    date: date,
  });
  const navigate = useNavigate();

  useEffect(() => {
    props.onDataUpdate(formData);
  }, [formData, props.onDataUpdate]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/create-trip", { state: { ...formData } });
  };

  const [openDate, setOpenDate] = useState(false);

  const [selectionRange, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleDate = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    const formattedStartDate = format(startDate, "MM/dd/yyyy");
    const formattedEndDate = format(endDate, "MM/dd/yyyy");
    setDate({ ...selectionRange, ...ranges.selection });
    setFormData({
      ...formData,
      date: `${formattedStartDate} - ${formattedEndDate}`,
    });
  };

  const handleClickDate = () => {
    setOpenDate((prev) => !prev);
  };

    // const city = "Lviv";
    // const days = "18.05.2024 - 23.05.2024";

  return (
    <section className="search-block">
      <div className="search-div">
        <form className="search-container" onSubmit={handleSubmit}>
          <FormInput
            icon={distance}
            placeholder="Your Location?"
            text="From"
            name="from"
            value={formData.from}
            onChange={handleChange}
          />
          <FormInput
            icon={distance}
            placeholder="Where are you going?"
            text="To"
            name="to"
            value={formData.to}
            onChange={handleChange}
          />
          <div className="date-input-wrapper">
              <FormInput
                icon={calendar_clock}
                placeholder="Add date"
                text="Date"
                name="date"
                onChange={handleChange}
                onClick={handleClickDate}
                className="last-field"
                value={formData.date}
              />
              {openDate && (
                <div className="date-picker-container">
                  <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleDate}
                    minDate={new Date()}
                  />
                </div>
              )}
            </div>
          <ActionButton text="Create Your Journey" onClick={handleSubmit} />
        </form>

        <div className="search-elements-div">
          <div className="photo-slider">
            <PlacesWrapper input={to} />
          </div>

          <div className="search-map">
            <Map destination={to} />
          </div>

          <Weather days_range={date} city={to} />
        </div>
      </div>
    </section>
  );
}
