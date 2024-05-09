import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css?_v=20240415034008';
import "./recSlider.css"
import RecommendCard from './Card.jsx';

const RecommendationSection = ({ recommendations, title, intro,  showIntro }) => {
    useEffect(() => {
        const swiper = new Swiper('.recommend__cards', {
            slidesPerView: 3,
            centeredSlides: true,
            loop: true,
            navigation: {
                nextEl: '.recommend__button_next',
                prevEl: '.recommend__button_prev',
            },
        });

        return () => {
            swiper.destroy();
        };
    }, []);

    return (
        <section className="page__recommend recommend">
            <div className="recommend__container">
                <div className="_container recommend__top">
                    <div className="recommend__topinfo">
                        <div className="recommend__title">title</div>
                        <div className="recommend__buttons">
                            <div className="recommend__button recommend__button_next">
                                <img src="img/icons/arrowl.svg" alt="" />
                            </div>
                            <div className="recommend__button recommend__button_prev">
                                <img src="img/icons/arrowr.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    {showIntro && (
                        <div className="recommend__intro">{intro}</div>
                    )}
                </div>
                <div className="recommend__cards swiper">
                    <div className="swiper-wrapper">
                        {recommendations.map((recommendation, index) => (
                            <RecommendCard
                                key={index}
                                country={recommendation.country}
                                title={recommendation.title}
                                num_of_coms={recommendation.num_of_coms}
                                imageWebp={recommendation.imageWebp}
                                imageSpare={recommendation.imageSpare}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecommendationSection;
