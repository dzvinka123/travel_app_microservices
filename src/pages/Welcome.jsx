import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RecommendationSection from "../components/recommendation/Rec-Section";
import Footer from "../components/footer/Footer.jsx";
import PartnerIMG from "../components/partners/Partner.jsx";
import partner1 from "../img/1.png";
import partner2 from "../img/2.png";
import partner3 from "../img/3.png";
import partner4 from "../img/4.png";
import partner5 from "../img/5.png";
import recImg1 from "../img/placeholder.png";
import recImg2 from "../img/Image2.png";
import recImg3 from "../img/Image3.png";
import WelcomeHeader from "../components/welcome-header/Welcome-Header.jsx";
import FormInput from "../components/formInput/Form-Input.jsx";
import ActionButton from "../components/action-button/ActionButton.jsx";
import { AuthContext } from "../session/AuthContext";
import Navbar from "../components/navbar/Navbar.jsx";
import { DateRangePicker } from "react-date-range"; // for date
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import "./Welcome.css";

import distance from "../img/distance.svg";
import calendar_clock from "../img/calendar_clock.svg";

export default function Welcome() {
  const { user } = useContext(AuthContext);
  const recommendations = [
    {
      country: "Ukraine",
      title: "Journey to Parashka Mountain",
      num_of_coms: "3,225",
      imageSpare: recImg1,
    },
    {
      country: "Italy",
      title:
        "Vatican Museums, Sistine Chapel & St Peter’s Basilica Guided Tour",
      num_of_coms: "3,225",
      imageSpare: recImg2,
    },
    {
      country: "Spain",
      title: "Barcelona",
      num_of_coms: "3,225",
      imageSpare: recImg3,
    },
    {
      country: "Ukraine",
      title: "Journey to Parashka Mountain",
      num_of_coms: "3,225",
      imageSpare: recImg1,
    },
    {
      country: "Italy",
      title:
        "Vatican Museums, Sistine Chapel & St Peter’s Basilica Guided Tour",
      num_of_coms: "3,225",
      imageSpare: recImg2,
    },
    {
      country: "Spain",
      title: "Barcelona",
      num_of_coms: "3,225",
      imageSpare: recImg3,
    },
  ];
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
    if (user) {
      event.preventDefault();
      navigate("/create-trip", {
        state: { ...formData },
      });
    } else {
      navigate("/login");
    }

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


  return (
    <>
      <div className="wrapper">
        {user ? <Navbar /> : <WelcomeHeader />}
        <main className="page">
          <section className="page__top top">
            <div className="top__bgcont">
              <div className="top__container _container">
                <div className="top__title">Explore the World</div>
                <div className="top__intro">
                  Start your journey today and unlock a world of possibilities
                  with our Travel Planner app. Adventure awaits!
                </div>
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
                  <ActionButton
                    text="Create Your Journey"
                    onClick={handleSubmit}
                  />
                </form>
              </div>
            </div>
          </section>
          <section className="page__partners partners">
            <div className="partners__container _container">
              <div className="partners__title">Trusted partner of</div>
              <div className="partners__list">
                <PartnerIMG imagePath={partner1} />
                <PartnerIMG imagePath={partner2} />
                <PartnerIMG imagePath={partner3} />
                <PartnerIMG imagePath={partner4} />
                <PartnerIMG imagePath={partner5} />
                <PartnerIMG imagePath={partner1} />
                <PartnerIMG imagePath={partner2} />
                <PartnerIMG imagePath={partner3} />
                <PartnerIMG imagePath={partner4} />
                <PartnerIMG imagePath={partner5} />
              </div>
            </div>
          </section>
          <RecommendationSection
            recommendations={recommendations}
            title={"Find places that suit your lifestyle"}
            intro={
              "Discover destinations tailored to your unique lifestyle with our Travel Planner app."
            }
            showIntro={true}
          />
        </main>
      </div>
      <Footer />
    </>
  );
}
