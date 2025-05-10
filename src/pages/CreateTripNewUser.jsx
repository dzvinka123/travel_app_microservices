import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import VisitPlace from "../components/places-to-visit/VisitPlace";
import Description from "../components/newuser/Description";
import Search from "../components/newuser/Search";
import ToDoList from "../components/journeys/ToDo-List";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useState } from "react";
import Friends from "../components/friends/Friends";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import left from "../img/left.svg";
import "./VisitPlace.css";
import rigth from "../img/rigth.svg";
import ActionButton from "../components/action-button/ActionButton";

export default function CreateTripNewUser() {
  const [tasks, setTasks] = useState([]);
  const [friends, setFriends] = useState([]);
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const navigate = useNavigate()

  const handleFriendsUpdate = (newFriendsList) => {
    setFriends(newFriendsList);
  };
  const handleToDoUpdate = (newTasks) => {
    setTasks(newTasks);
    console.log(tasks);
  }
  const handleData = (newData) => {
    setFrom(newData.from);
    setTo(newData.to);
    const [start, end] = newData.date.split(' - ');
    setStart(start);
    setEnd(end);
  };
  const handleDescriptinion = (newDescription) => {
    setDescription(newDescription);
  };
  const handleSubmit = async () => {
    //e.preventDefault();
    console.log("g")
    try {
      const response = await axios.post(`http://localhost:8008/add-travel-card`, {
        from_: from,
        to: to,
        start_date: startDate,
        end_date: endDate,
        active: 0,
        description: description,
        emails: friends,
        tasks: tasks
      });
      console.log('Travel card created:', response.data);
      navigate('/journeys');
    } catch (error) {
      console.error('Error creating travel card:', error.response ? error.response.data : error.message);
    }
  };
  return (
    <>
      <Wrapper
        apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_API}
        libraries={["marker", "places"]}
      >
        <Navbar />
        {/* search block */}

        <Search onDataUpdate={handleData} />

        <section className="interesting-place">
          <h2>
            Add a touch of magic to your list — discover a world of
            unforgettable places!
          </h2>
          <span>Things to do</span>
          <div className="swipper-buttons">
            <button className="swiper-button sbprev">
              <img src={left} />
            </button>
            <button className="swiper-button sbnext">
              <img src={rigth} />
            </button>
          </div>
          {/* <VisitPlace /> */}
        </section>

        <section className="additional-container">
          <ToDoList cardId={null} toDos={[]} handleToDoUpdate={handleToDoUpdate} />
          <Description onDescriptionUpdate={handleDescriptinion} />
        </section>
        <div className="submit-button-endpage">
          <Friends onFriendsUpdate={handleFriendsUpdate}></Friends>
          <ActionButton handleSubmit={handleSubmit} text="Save Trip" className="submit-button-endpage" />
        </div>
        <Footer />
      </Wrapper>
    </>
  );
}
