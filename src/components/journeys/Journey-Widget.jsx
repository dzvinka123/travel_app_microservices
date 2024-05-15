import "./widgetstyles.css"
import Map from "./Map"
import ToDoList from './ToDo-List';

export default function JourneyWidget({ onClose, destination }) {

    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="container">
                    <div className="first-row-container">
                        <div className="block first-block">
                            <p className="widget-header">Journey To <br /> {destination}</p>
                        </div>
                        <div className="block first-block"></div>
                        <div className="block second-block"></div>
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