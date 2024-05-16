import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import JourneyOption from './Journey-Option';
import JourneyWidget from './Journey-Widget';
import "./widgetstyles.css";

export default function JourneyManager(country, title, date) {
    const [widgetVisible, setWidgetVisible] = useState(false);

    const toggleWidgetVisibility = () => {
        setWidgetVisible(!widgetVisible);
    };

    return (
        <div>
            <JourneyOption onButtonClick={toggleWidgetVisibility} />
            {widgetVisible && ReactDOM.createPortal(
                <div className="journey-popup-overlay">
                    <JourneyWidget onClose={toggleWidgetVisibility} />
                </div>,
                document.body
            )}
        </div>
    );
}
