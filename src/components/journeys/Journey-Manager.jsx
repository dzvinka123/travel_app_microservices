import React, { useState } from 'react';
import JourneyOption from './Journey-Option';
import JourneyWrapper from './Journey-Wrapper';
import "./widgetstyles.css";

export default function JourneyManager() {
    const [widgetVisible, setWidgetVisible] = useState(false);

    const toggleWidgetVisibility = () => {
        setWidgetVisible(!widgetVisible);
    };

    return (
        <div>
            <JourneyOption onButtonClick={toggleWidgetVisibility} />
            {widgetVisible && <JourneyWrapper onClose={toggleWidgetVisibility} />}
        </div>
    );
}
