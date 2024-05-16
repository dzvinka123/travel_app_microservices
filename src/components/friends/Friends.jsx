import React from 'react';
import plus from "../../img/add.svg"
import Friend from './Friend';
import "./Friends.css"

export default function Friends () {
    const friends = [];
    return (
        <section className='friends'>
            <div className="friends_container _container">
                <div className="friends__title">Invite Your Friends <br></br> to Join You</div>
                <div className="friends__info">
                    <div className="friends__descr">Members/Friends</div>
                    <div className="friends__friends">
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <button className="friends__plus">
                            <img src={plus} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};