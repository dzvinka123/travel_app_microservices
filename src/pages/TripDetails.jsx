import { useLocation } from 'react-router-dom';

function TripDetails() {
    const location = useLocation();
    const { from, to, date } = location.state;

    return (
        <div>
            <h1>Trip Details</h1>
            <p>From: {from}</p>
            <p>To: {to}</p>
            <p>Date: {date}</p>
        </div>
    );
}

export default TripDetails;