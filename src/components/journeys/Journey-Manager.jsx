import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import JourneyOption from './Journey-Option';
import JourneyWidget from './Journey-Widget';
import "./widgetstyles.css";

// destination
// date 
// title -- "From {source} To {destination}"
// to-do cards 

export default function JourneyManager(country, title, date, description) {
    const [widgetVisible, setWidgetVisible] = useState(false);

    const toggleWidgetVisibility = () => {
        setWidgetVisible(!widgetVisible);
    };

    return (
        <div>
            <JourneyOption onButtonClick={toggleWidgetVisibility} country={country} title={title} date={date} />
            {widgetVisible && ReactDOM.createPortal(
                <div className="journey-popup-overlay">
                    <JourneyWidget onClose={toggleWidgetVisibility} description={description} daysRange={date}/>
                </div>,
                document.body
            )}
        </div>
    );
}
