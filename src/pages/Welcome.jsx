import React, {useContext} from "react";
import "./Welcome.css"
import RecommendationSection from "../components/recommendation/Rec-Section";
import Footer from "../components/footer/Footer.jsx"
import PartnerIMG from "../components/partners/Partner.jsx";
import partner1 from "../img/1.png";
import partner2 from "../img/2.png";
import partner3 from "../img/3.png";
import partner4 from "../img/4.png";
import partner5 from "../img/5.png";
import recImg1 from "../img/placeholder.png";
import recImg2 from "../img/Image2.png";
import recImg3 from "../img/Image3.png";
import dividor from "../img/dividor.svg";
import search_but from "../img/search_but.svg";
import WelcomeHeader from "../components/welcome-header/Welcome-Header.jsx";
import WelcomeFormInput from "../components/welcome-form/welcome-form-input.jsx";
import { AuthContext } from "../session/AuthContext";
import Navbar from "../components/navbar/Navbar.jsx";
export default function Welcome() {
    const { user } = useContext(AuthContext);
    console.log(user)
    const recommendations = [
        {
            country: 'Ukraine',
            title: 'Journey to Parashka Mountain',
            num_of_coms: '3,225',
            imageSpare: recImg1,
        },
        {
            country: 'Italy',
            title: 'Vatican Museums, Sistine Chapel & St Peter’s Basilica Guided Tour',
            num_of_coms: '3,225',
            imageSpare: recImg2,
        },
        {
            country: 'Spain',
            title: 'Barcelona',
            num_of_coms: '3,225',
            imageSpare: recImg3,
        },
        {
            country: 'Ukraine',
            title: 'Journey to Parashka Mountain',
            num_of_coms: '3,225',
            imageSpare: recImg1,
        },
        {
            country: 'Italy',
            title: 'Vatican Museums, Sistine Chapel & St Peter’s Basilica Guided Tour',
            num_of_coms: '3,225',
            imageSpare: recImg2,
        },
        {
            country: 'Spain',
            title: 'Barcelona',
            num_of_coms: '3,225',
            imageSpare: recImg3,
        }
    ];
    return (
        <>
        <div className="wrapper">
            {user ? <Navbar /> : <WelcomeHeader />}
            <main className="page">
                <section className="page__top top">
                    <div className="top__bgcont">
                        <div className="top__container _container">
                            <div className="top__title">
                                Explore the World
                            </div>
                            <div className="top__intro">
                                Start your journey today and unlock a world of possibilities with our Travel Planner app. Adventure awaits!
                            </div>
                            <div className="top__find find">
                                <form className="find__information">
                                    <WelcomeFormInput name={"From"} placeholder={"Your location?"}/>
                                    <div className="find__dividor">
                                        <img src={dividor} alt=""></img>
                                    </div>
                                    <WelcomeFormInput name={"To"} placeholder={"Where are you going?"}/>
                                    <div className="find__dividor">
                                        <img src={dividor} alt=""></img>
                                    </div>
                                    <WelcomeFormInput name={"Date"} placeholder={"Add dates"}/>
                                </form>
                                <div className="find__search">
                                    <a href="#" className="find__searchbut">
                                        <img src={search_but} alt=""></img>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="page__partners partners">
                    <div className="partners__container _container">
                        <div className="partners__title">
                            Trusted partner of
                        </div>
                        <div className="partners__list">
                            <PartnerIMG imagePath={partner1}/>
                            <PartnerIMG imagePath={partner2}/>
                            <PartnerIMG imagePath={partner3}/>
                            <PartnerIMG imagePath={partner4}/>
                            <PartnerIMG imagePath={partner5}/>
                            <PartnerIMG imagePath={partner1}/>
                            <PartnerIMG imagePath={partner2}/>
                            <PartnerIMG imagePath={partner3}/>
                            <PartnerIMG imagePath={partner4}/>
                            <PartnerIMG imagePath={partner5}/>
                        </div>
                    </div>
                </section>
                <RecommendationSection recommendations={recommendations} title={"Find places that suit your lifestyle"} intro={"Discover destinations tailored to your unique lifestyle with our Travel Planner app."} showIntro={true}/>
            </main>
        </div>
        <Footer />
      </>
    );
  }