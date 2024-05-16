import React, { useState, useContext } from 'react';
import JourneysActive from "./Journeys-Active"
import JourneysPending from "./Journeys-Pending"
import JourneysGreeting from "./Journeys-Greeting"
import { AuthContext } from '../../session/AuthContext';

export default function RenderJourneys() {
    const { user } = useContext(AuthContext);
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
            <JourneysGreeting activeButton={activeButton} setActiveButton={setActiveButton} userName={user.name}/>
            <div className="component-display">
                {renderComponent()}
            </div>
        </div>
    );
}
