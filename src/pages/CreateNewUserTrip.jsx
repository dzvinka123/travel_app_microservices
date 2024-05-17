import JourneysEmpty from "../components/journeys/Journeys-Empty";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import FormInput from "../components/formInput/Form-Input";
import ActionButton from "../components/action-button/ActionButton";
import RecommendationSection from "../components/recommendation/Rec-Section";
import recImg1 from "../img/placeholder.png";
import recImg2 from "../img/Image2.png";
import recImg3 from "../img/Image3.png";
import { DateRangePicker } from 'react-date-range'; // for date
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
 


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

    const [openDate, setOpenDate] = useState(false);

    const [selectionRange, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleDate = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        const formattedStartDate = format(startDate, 'MM/dd/yyyy');
        const formattedEndDate = format(endDate, 'MM/dd/yyyy');
        setDate({ ...selectionRange, ...ranges.selection });
        setFormData({ ...formData, date: `${formattedStartDate} - ${formattedEndDate}` });
    };

    const handleClickDate = () => {
        setOpenDate(prev => !prev);
    };


    const recommendations = [
        {
            country: 'Ukraine',
            title: 'Journey to Parashka Mountain',
            num_of_coms: '3,225',
            imageSpare: recImg1,
        },
        {
            country: 'Italy',
            title: 'Vatican Museums, Sistine Chapel & St Peter’s Basilica Guided Tour',
            num_of_coms: '3,225',
            imageSpare: recImg2,
        },
        {
            country: 'Spain',
            title: 'Barcelona',
            num_of_coms: '3,225',
            imageSpare: recImg3,
        },
        {
            country: 'Ukraine',
            title: 'Journey to Parashka Mountain',
            num_of_coms: '3,225',
            imageSpare: recImg1,
        },
        {
            country: 'Italy',
            title: 'Vatican Museums, Sistine Chapel & St Peter’s Basilica Guided Tour',
            num_of_coms: '3,225',
            imageSpare: recImg2,
        },
        {
            country: 'Spain',
            title: 'Barcelona',
            num_of_coms: '3,225',
            imageSpare: recImg3,
        }
    ];
    return (
        <div>
            <main className="create-home">
                <Navbar />
                <section className="search-location">
                    <h2>Your Adventure Awaits</h2>
                    <form className="search-container" onSubmit={handleSubmit}>
                        <FormInput icon={distance} placeholder="Your Location?" text="From" name="from" onChange={handleChange} />
                        <FormInput icon={distance} placeholder="Where are you going?" text="To" name="to" onChange={handleChange} />
                        <div className="date-input-wrapper">
                        <FormInput
                            icon={calendar_clock}
                            placeholder="Add date"
                            text="Date"
                            name="date"
                            onChange={handleChange}
                            onClick={handleClickDate}
                            className="last-field"
                            value={formData.date}
                        />
                        {openDate && (
                            <div className="date-picker-container">
                            <DateRangePicker
                                ranges={[selectionRange]}
                                onChange={handleDate}
                                minDate={new Date()}
                            />
                            </div>
                        )}
                        </div>
                        <ActionButton text="Create Your Journey" onClick={handleSubmit} />
                    </form>
                </section>
                <JourneysEmpty />
                <RecommendationSection recommendations={recommendations} title={"Find places that suit your lifestyle"} intro={"Discover destinations tailored to your unique lifestyle with our Travel Planner app."} showIntro={true}/>
             </main>
            <Footer />
        </div>
    );
}
