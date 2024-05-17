import "./widgetstyles.css"
import Map from "./Map"
import ToDoList from './ToDo-List';
import VisitPlace from "../places-to-visit/VisitPlace"
import Weather from "../newuser/Weather"
import left from "../../img/left.svg"
import right from "../../img/rigth.svg"
import { Wrapper } from "@googlemaps/react-wrapper";
import "./Places.css"

export default function JourneyWidget({ onClose, id, destination, description, startDate, endDate, toDos, emails }) {
    const date = `${startDate} - ${endDate}`
    const [todos, setToDos] = useState(toDos)
    const handleToDoUpdate = (newToDoList) => {
        setToDos(newToDoList);
    };
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
                            <div className="block second-block">
                            <div className="swiper-button-prev">
                                <img src={left} />
                            </div>
                            <div className="swiper-button-next">
                                <img src={right} />
                            </div>
                                <VisitPlace city={destination}/>
                            </div>
                        </div>
                        <div className="second-row-container">
                            <ToDoList handleToDoUpdate={handleToDoUpdate} cardId={id} toDos={todos}/>
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