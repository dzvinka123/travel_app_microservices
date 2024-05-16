import "./widgetstyles.css"
import Map from "./Map"
import ToDoList from './ToDo-List';
import Weather from "../newuser/Weather"
import { Wrapper } from "@googlemaps/react-wrapper";

export default function JourneyWidget({ onClose, destination, description, date }) {

    return (
        <Wrapper apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_API} libraries={['marker']}>
            <div className="modal-container">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <div className="container">
                        <div className="first-row-container">
                            <div className="block first-block">
                                <p className="widget-header">Journey To <br /> {destination}</p>
                                <p className="widget-description">{description}</p>
                                {/* Add friends functionality */}
                            </div>
                            <Weather days_range={date} city={destination} />
                            <div className="block second-block"></div>
                        </div>
                        <div className="second-row-container">
                            <ToDoList />
                            <div className="big-block">
                                <Map destination={destination}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}