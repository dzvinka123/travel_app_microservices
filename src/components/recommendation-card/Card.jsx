import React from 'react';
import arrowdiag from '../../img/arrowdiag.svg';
import star from '../../img/star.svg';
import 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css?_v=20240415034008';
import "./Card.css"

const RecommendCard = ({country, title, num_of_coms, imageWebp, imageSpare}) => {
    return (
        <div className="recommend__card card swiper-slide">
            <div className="card__image">
                <picture>
                    <source srcSet={imageWebp} type="image/webp" />
                    <img src={imageSpare} alt="" />
                </picture>
            </div>
            <div className="card__country card__country_purple">{country}</div>
            <div className="card__titleinfo">
                <div className="card__title">{title}</div>
                <a href="#" className="card__arrow">
                    <img src={arrowdiag} alt="" />
                </a>
            </div>
            <div className="card__rate">
                <div className="card__stars">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className={`card__star card__star_${index + 1}`}>
                            <img src={star} alt="" />
                        </div>
                    ))}
                </div>
                <div className="card_numofcoms">{num_of_coms}</div>
            </div>
        </div>
    );
};

export default RecommendCard;
