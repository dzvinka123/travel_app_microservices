import React from "react";
import "./createdTripUser.css";
import AddButton from "./AddButton";

export default function HotelCard({plus, booking}) {
    return (
        <div className="hotel-card">
            <div className="card-info">
                <img src={booking} alt="Hotel picture"/>
                    <div className="card-text">
                        <h3>Radisson Blue Resort</h3>
                        <span>300 m from center</span>
                        <h4>Only 3 rooms left at this price on our site</h4>
                        <div className="stars">
                            <div>
                                {/* stars */}
                            </div>
                            <span>3,235</span>
                        </div>
                    </div>
            </div>
            <div className="card-price">
                <div className="price">
                    <h5>from $ 570.00/night</h5>
                    <div>
                        <span>booking.com</span>
                    </div>
                </div>
                {/* <button className="book-now">Book now <img src={plus} /></button> */}
                <AddButton plus={plus} clas={"book-now"} text={"Book now"}/>
            </div>
        </div>
    );
}