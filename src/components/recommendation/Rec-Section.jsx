import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./Rec-Section.css";
import RecommendationCard from './Rec-Card.jsx';
import arrowl from "../../img/arrowl.svg";
import arrowr from "../../img/arrowr.svg";


export default function RecommendationSection ({ recommendations, title, intro, showIntro })  {
    return (
        <section className="page__recommend recommend">
            <div className="recommend__container">
                <div className="_container recommend__top">
                    <div className="recommend__topinfo">
                        <div className="recommend__title">{title}</div>
                        <div className="recommend__buttons">
                            <div className="recommend__button recommend__button_next">
                                <img src={arrowl} alt="" />
                            </div>
                            <div className="recommend__button recommend__button_prev">
                                <img src={arrowr} alt="" />
                            </div>
                        </div>
                    </div>
                    {showIntro && (
                        <div className="recommend__intro">{intro}</div>
                    )}
                </div>

                <Swiper
                className='recommend__cards'
                modules={[Navigation]}
                slidesPerView={3}
                loop
                navigation={{
                    nextEl: ".recommend__button_prev",
                    prevEl: ".recommend__button_next"
                }}
                >
                        <SwiperSlide>
                            <RecommendationCard
                                country={recommendations[0].country}
                                title={recommendations[0].title}
                                num_of_coms={recommendations[0].num_of_coms}
                                imageSpare={recommendations[0].imageSpare}
                            />
                        </SwiperSlide >
                        <SwiperSlide>
                            <RecommendationCard
                                country={recommendations[1].country}
                                title={recommendations[1].title}
                                num_of_coms={recommendations[1].num_of_coms}
                                imageSpare={recommendations[1].imageSpare}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <RecommendationCard
                                country={recommendations[2].country}
                                title={recommendations[2].title}
                                num_of_coms={recommendations[2].num_of_coms}
                                imageSpare={recommendations[2].imageSpare}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <RecommendationCard
                                country={recommendations[3].country}
                                title={recommendations[3].title}
                                num_of_coms={recommendations[3].num_of_coms}
                                imageSpare={recommendations[3].imageSpare}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <RecommendationCard
                                country={recommendations[4].country}
                                title={recommendations[4].title}
                                num_of_coms={recommendations[4].num_of_coms}
                                imageSpare={recommendations[4].imageSpare}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <RecommendationCard
                                country={recommendations[5].country}
                                title={recommendations[5].title}
                                num_of_coms={recommendations[5].num_of_coms}
                                imageSpare={recommendations[5].imageSpare}
                            />
                        </SwiperSlide>
                 </Swiper>
            </div>
        </section>
    );
};


