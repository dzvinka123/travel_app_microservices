import React, { useState } from 'react';
import JourneysActive from "./Journeys-Active"
import JourneysPending from "./Journeys-Pending"
import JourneysGreeting from "./Journeys-Greeting"

export default function RenderJourneys() {
    const [activeButton, setActiveButton] = useState('active');

    const renderComponent = () => {
        if (activeButton === 'active') {
            return <JourneysActive />;
        } else if (activeButton === 'pending') {
            return <JourneysPending />;
        }
    };

    return (
        <div>
            <JourneysGreeting activeButton={activeButton} setActiveButton={setActiveButton} />
            <div className="component-display">
                {renderComponent()}
            </div>
        </div>
    );
}
