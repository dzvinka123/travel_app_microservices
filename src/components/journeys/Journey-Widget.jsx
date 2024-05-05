import "./Journeys.js"
import "./widgetstyles.css"

export default function JourneyWidget({ onClose }) {
    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="container">
                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh0cCGIVX-40iw_X0VSJVUx2kMV-7l6Bs&loading=async&callback=initMap"></script>
                    <div className="first-row-container">
                        <div className="block"></div>
                        <div className="block"></div>
                        <div className="smallblock-container">
                            <div className="small-block"></div>
                            <div className="small-block"></div>
                        </div>
                    </div>
                    <div className="second-row-container">
                        <div className="block to-do-block"></div>
                        <div className="big-block">
                            <div id="map"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
