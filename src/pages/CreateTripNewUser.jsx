import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Driver from "../components/newuser/Driver";
import HotelCard from "../components/newuser/HotelCard";
import plus from "../img/add.svg"
import person from "../img/person.png"
import booking from "../img/booking.png"

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
        
        {/* 4 block */}
        

        <Footer />
      </>
    );
  }