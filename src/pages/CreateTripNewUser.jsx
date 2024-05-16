
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Driver from "../components/newuser/Driver";
import HotelCard from "../components/newuser/HotelCard";
import ToDos from "../components/newuser/ToDos";
import AddButton from "../components/newuser/AddButton";
import Description from "../components/newuser/Description";
import Search from "../components/newuser/Search";
import plus from "../img/add.svg"
import person from "../img/person.png"
import booking from "../img/booking.png"
import "../components/newuser/createdTripUser.css";


export default function CreateTripNewUser() { 
    const city = 'Lviv';
    const days = "18.05.2024 - 23.05.2024";
    
    return (
      <>
        <Navbar />
        {/* search block */}
        <Search days={days} city={city} />
        {/* 2 block */}

        <div className="ride-text">
            <h2>Secure Your Ride: Booking Transport</h2>
        </div>
            
        <div className="driver-block">
            <h3>Available cars for ride</h3>
            <span>Fri, Apr 26 2024</span> {/* this span will be dynamic */}
            <div className="drivers-container">
                <div className="driver-col">
                    {/* change css to make it cols with 2 elements */}
                    <Driver person={person} plus={plus} />
                    <Driver person={person} plus={plus}/>
                </div>
            </div>
        </div>
            
        {/* 3 block */}
        <div className="hotel-text">
            <h2>Find Your Home Away From Home: Booking Accommodation</h2>
        </div>
            
        <div className="hotel-block">
            <h3>Browse Accommodation Options: Available Hotels</h3>
            <span>Fri, Apr 26 2024 - Mon, Apr 29 2024</span> {/* this span will be dynamic */}
            <div className="hotel-cards">
                <div className="hotel-col">
                    {/* change css to make it cols with 2 elements */}
                    <HotelCard plus={plus} booking={booking}/>
                    <HotelCard plus={plus} booking={booking}/>
                </div>
            </div>
        </div>
    
        {/* 5 block */}
        <section className="additional-container">
            <div className="todo-list">
                <div className="todo-text">
                    <h2>Additional Information</h2>
                </div>  
                    
                <div className="todo-box">
                    <div className="todo-box-text">
                        <h4>To-Do List</h4> 
                    </div>
                    <div className="checkboxes">
                        <div className="checkbox-list">
                            <ToDos text={"Research local cafes for breakfast spots in Yaremche"} id={"box1"} />
                            <ToDos text={"Book tickets for the Waterfall Probiy"} id={"box2"} />
                            <div className="todo-button">
                                <AddButton plus={plus} />
                                <label htmlFor="box2"><input placeholder="Add your tasks here..."/></label><br/> {/* this might be dynamic */}
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            <Description />  
        </section>  
        
        <Footer />
      </>
    );
}
