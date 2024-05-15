import "./widgetstyles.css"
import Map from "./Map"
import ToDoList from './Journeys-ToDo';

export default function JourneyWidget({ onClose }) {

    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="container">
                    <div className="first-row-container">
                        <div className="block"></div>
                        <div className="block"></div>
                        <div className="smallblock-container">
                            <div className="small-block"></div>
                            <div className="small-block"></div>
                        </div>
                    </div>
                    <div className="second-row-container">
                        <ToDoList />
                        <Map />
                    </div>
                </div>
            </div>
        </div>
    )
}