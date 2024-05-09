import React from "react";
import "./Welcome.css"
import RecommendationSection from "../components/recommendation-card/recommendationSection";
export default function Welcome() {
    const recommendations = [
        {
            country: 'Ukraine',
            title: 'Journey to Parashka Mountain',
            num_of_coms: '3,225',
            imageWebp: '../img/Image1.webp',
            imageSpare: '../img/Image1.png',
        },
        {
            country: 'Italy',
            title: 'Vatican Museums, Sistine Chapel & St Peter’s Basilica Guided Tour',
            num_of_coms: '3,225',
            imageWebp: '../img/Image2.webp',
            imageSpare: '../img/Image2.png',
        },
        {
            country: 'Spain',
            title: 'Barcelona',
            num_of_coms: '3,225',
            imageWebp: '../img/Image3.webp',
            imageSpare: '../img/Image3.png',
        },
    ];
    return (
        <>
        <div class="wrapper">
            <header class="header">
                <div class="header_wrapper">
                    <div class="header__container _container">
                        <div class="header__body">
                            <div href="#" class="header__left">
                                <a href="#" class="header__logo">
                                    <picture><source srcset="img/logos/logo_getaway.webp" type="image/webp"><img src="img/logos/logo_getaway.png" alt=""></img></source></picture>
                                    <span>getaway</span>
                                </a>
                            </div>
                            <div class="header__right">
                                <a href="#" class="header__loginbutton">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main class="page">
                <section class="page__top top">
                    <div class="top__bgcont">
                        <div class="top__container _container">
                            <div class="top__title">
                                Explore the World
                            </div>
                            <div class="top__intro">
                                Start your journey today and unlock a world of possibilities with our Travel Planner app. Adventure awaits!
                            </div>
                            <div class="top__find find">
                                <div class="find__information">
                                    <div class="find__infoblolck">
                                        <div class="find__name">
                                            From
                                        </div>
                                        <input type="text" placeholder="Your location?" class="find__input"></input>
                                    </div>
                                    <div class="find__dividor">
                                        <img src="img/icons/dividor.svg" alt=""></img>
                                    </div>
                                    <div class="find__infoblolck">
                                        <div class="find__name">
                                            To
                                        </div>
                                        <input type="text" placeholder="Where are you going?" class="find__input"></input>
                                    </div>
                                    <div class="find__dividor">
                                        <img src="img/icons/dividor.svg" alt=""></img>
                                    </div>
                                    <div class="find__infoblolck">
                                        <div class="find__name">
                                            Date
                                        </div>
                                        <input type="text" placeholder="Add dates" class="find__input"></input>
                                    </div>
                                </div>
                                <div class="find__search">
                                    <a href="#" class="find__searchbut">
                                        <img src="img/icons/search_but.svg" alt=""></img>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="page__partners partners">
                    <div class="partners__container _container">
                        <div class="partners__title">
                            Trusted partner of
                        </div>
                        <div class="partners__list">
                            <div class="partners__partner">
                                <picture><source srcset="img/partners/1.webp" type="image/webp"><img src="img/partners/1.png" alt=""></img></source></picture>
                            </div>
                            <div class="partners__partner">
                                <picture><source srcset="img/partners/2.webp" type="image/webp"><img src="img/partners/2.png" alt=""></img></source></picture>
                            </div>
                            <div class="partners__partner">
                                <picture><source srcset="img/partners/3.webp" type="image/webp"><img src="img/partners/3.png" alt=""></img></source></picture>
                            </div>
                            <div class="partners__partner">
                                <picture><source srcset="img/partners/4.webp" type="image/webp"><img src="img/partners/4.png" alt=""></img></source></picture>
                            </div>
                            <div class="partners__partner">
                                <picture><source srcset="img/partners/5.webp" type="image/webp"><img src="img/partners/5.png" alt=""></img></source></picture>
                            </div>
                            <div class="partners__partner">
                                <picture><source srcset="img/partners/1.webp" type="image/webp"><img src="img/partners/1.png" alt=""></img></source></picture>
                            </div>
                            <div class="partners__partner">
                                <picture><source srcset="img/partners/2.webp" type="image/webp"><img src="img/partners/2.png" alt=""></img></source></picture>
                            </div>
                            <div class="partners__partner">
                                <picture><source srcset="img/partners/3.webp" type="image/webp"><img src="img/partners/3.png" alt=""></img></source></picture>
                            </div>
                            <div class="partners__partner">
                                <picture><source srcset="img/partners/4.webp" type="image/webp"><img src="img/partners/4.png" alt=""></img></source></picture>
                            </div>
                            <div class="partners__partner">
                                <picture><source srcset="img/partners/5.webp" type="image/webp"><img src="img/partners/5.png" alt=""></img></source></picture>
                            </div>
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