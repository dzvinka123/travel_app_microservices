import JourneysEmpty from "../components/journeys/Journeys-Empty";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import FormInput from "../components/formInput/Form-Input";
import ActionButton from "../components/action-button/ActionButton";

import "./CreateNewUserTrip.css" // delete after create final css file

import distance from "../img/distance.svg"
import calendar_clock  from "../img/calendar_clock.svg"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreateNewUserTrip() {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/create-new-user-trip/trip-details', { state: { ...formData } });
    };

    return (
        <div>
             <main class="create-home">
                <Navbar />
                <section class="search-location">
                <h2>Your Adventure Awaits</h2>
                    <form className="search-container" onSubmit={handleSubmit}>
                        <FormInput icon={distance} placeholder="Your Location?" text="From" name="from" onChange={handleChange} />
                        <FormInput icon={distance} placeholder="Where are you going?" text="To" name="to" onChange={handleChange}/>
                        <FormInput icon={calendar_clock} placeholder="Add date" text="Date" name="date" onChange={handleChange} className="last-field" />
                        <ActionButton text="Create Your Journey" onClick={handleSubmit} />
                    </form>
                </section>
                <JourneysEmpty />
             </main>
            <Footer />
        </div>
    );
}