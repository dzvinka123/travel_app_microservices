import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Driver from "../components/newuser/Driver";
import HotelCard from "../components/newuser/HotelCard";
import ToDos from "../components/newuser/ToDos";
import AddButton from "../components/newuser/AddButton";
import Description from "../components/newuser/Description";
import plus from "../img/add.svg"
import person from "../img/person.png"
import booking from "../img/booking.png"
import "../components/newuser/createdTripUser.css";


export default function CreateTripNewUser() {
    return (
      <>
        <Navbar />
        {/* 2 block */}
        <div class="ride-text">
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
        <div class="hotel-text">
            <h2>Find Your Home Away From Home: Booking Accommodation</h2>
        </div>
            
        <div class="hotel-block">
            <h3>Browse Accommodation Options: Available Hotels</h3>
            <span>Fri, Apr 26 2024 - Mon, Apr 29 2024</span> {/* this span will be dynamic */}
            <div class="hotel-cards">
                <div class="hotel-col">
                    {/* change css to make it cols with 2 elements */}
                    <HotelCard plus={plus} booking={booking}/>
                    <HotelCard plus={plus} booking={booking}/>
                </div>
            </div>
        </div>
    
        {/* 5 block */}
        <section class="additional-container">
            <div class="todo-list">
                <div class="todo-text">
                    <h2>Additional Information</h2>
                </div>  
                    
                <div class="todo-box">
                    <div class="todo-box-text">
                        <h4>To-Do List</h4> 
                    </div>
                    <div class="checkboxes">
                        <div class="checkbox-list">
                            <ToDos text={"Research local cafes for breakfast spots in Yaremche"}/>
                            <ToDos text={"Book tickets for the Waterfall Probiy"} />
                            <div class="todo-button">
                                <AddButton plus={plus} />
                                <label for="box2"><input placeholder="Add your tasks here..."/></label><br/> {/* this might be dynamic */}
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