import React, { useState } from 'react';
import JourneyOption from './Journey-Option';
import JourneyWidget from './Journey-Widget';
import "./widgetstyles.css";

export default function JourneyManager() {
    const [widgetVisible, setWidgetVisible] = useState(false);

    const toggleWidgetVisibility = () => {
        setWidgetVisible(!widgetVisible);
    };

    return (
        <div>
            <JourneyOption onButtonClick={toggleWidgetVisibility} />
            {widgetVisible && <JourneyWidget onClose={toggleWidgetVisibility} />}
        </div>
    );
}
