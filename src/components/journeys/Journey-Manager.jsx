import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import JourneyOption from './Journey-Option';
import JourneyWidget from './Journey-Widget';
import "./widgetstyles.css";

export default function JourneyManager(journey) {
    const [widgetVisible, setWidgetVisible] = useState(false);
    const toggleWidgetVisibility = () => {
        setWidgetVisible(!widgetVisible);
    };
    const handleJourneyUpdate = (newList) => {
        journey.journey.todoList = newList;
    }
    return (
        <div>
            <JourneyOption onButtonClick={toggleWidgetVisibility} to={journey.journey.to} from={journey.journey.from} startDate={journey.journey.start_date} endDate={journey.journey.end_date} />
            {widgetVisible && ReactDOM.createPortal(
                <div className="journey-popup-overlay">
                    <JourneyWidget handleJourneyUpdate={handleJourneyUpdate} onClose={toggleWidgetVisibility} id={journey.journey.id} destination={journey.journey.to} description={journey.journey.description} startDate={journey.journey.start_date} endDate={journey.journey.end_date} toDos={journey.journey.todoList} emails={journey.journey.emails} />
                </div>,
                document.body
            )}
        </div>
    );
}
