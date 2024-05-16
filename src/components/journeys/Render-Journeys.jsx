import React, { useState, useContext } from 'react';
import axios from 'axios';
import JourneysActive from "./Journeys-Active";
import JourneysPending from "./Journeys-Pending";
import JourneysGreeting from "./Journeys-Greeting";
import JourneysEmpty from "./Journeys-Empty";
import { AuthContext } from '../../session/AuthContext';

export default function RenderJourneys() {
    const { user } = useContext(AuthContext);
    console.log(user)
    const [activeButton, setActiveButton] = useState('active');
    const [journeys, setJourneys] = useState([]);

    const fetchJourneys = (email) => {
        axios.get(`http://localhost:3001/user-travel-cards?email=${email}`)
            .then(response => {
                const { success, travelCards } = response.data;
                if (success) {
                    setJourneys(travelCards);
                } else {
                    console.error("Failed to fetch journeys:", response.data.message);
                }
            })
            .catch(error => {
                console.error("Failed to fetch journeys:", error);
            });
    };

    const fetchActive = (e) => {
        e.preventDefault();
        fetchJourneys(user.email);
        setActiveButton('active');
    };

    const fetchPending = (e) => {
        e.preventDefault();
        fetchJourneys(user.email);
        setActiveButton('pending');
    };

    const renderComponent = () => {
        if (activeButton === 'active') {
            if (journeys) {
                return <JourneysActive journeys={journeys} />;
            }
            return <JourneysEmpty />;
        } else if (activeButton === 'pending') {
            if (journeys) {
                return <JourneysPending journeys={journeys} />;
            }
            return <JourneysEmpty />;
        }
    };
    console.log(user);

    if (user) {
        return (
            <div>
                <JourneysGreeting activeButton={activeButton} setActiveButton={setActiveButton} userName={user.name} />
                <div className="component-display">
                    {renderComponent()}
                </div>
            </div>
        );
    }

}
