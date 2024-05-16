import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import VisitPlace from "../components/places-to-visit/VisitPlace";
import ToDos from "../components/newuser/ToDos";
import AddButton from "../components/newuser/AddButton";
import Description from "../components/newuser/Description";
import Search from "../components/newuser/Search";
import plus from "../img/add.svg";
import { Wrapper } from "@googlemaps/react-wrapper";
import "../components/newuser/createdTripUser.css";
import { useState } from "react";
import Friends from "../components/friends/Friends";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(tasks)
    console.log(friends)
    console.log(from)
    console.log(to)
    console.log(startDate)
    console.log(endDate)
    console.log(description)

    try {
      const response = await axios.post(`http://localhost:3001/add-travel-card`, {
        from: from,
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

        <Search onDataUpdate={handleData}/>
        {/* 3 block */}
        <section className="interesting-place">
          <h2>
            Add a touch of magic to your list — discover a world of
            unforgettable places!
          </h2>
          <span>Things to do</span>
          <div className="swiper-button-prev">Prev</div>
          <div className="swiper-button-next">Next</div>
          <VisitPlace />
        </section>

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
                  <ToDos
                    text={
                      "Research local cafes for breakfast spots in Yaremche"
                    }
                    id={"box1"}
                  />
                  <ToDos
                    text={"Book tickets for the Waterfall Probiy"}
                    id={"box2"}
                  />
                  <div className="todo-button">
                    <AddButton plus={plus} />
                    <label htmlFor="box2">
                      <input placeholder="Add your tasks here..." />
                    </label>
                    <br /> {/* this might be dynamic */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Description  onDescriptionUpdate={handleDescriptinion}/>
        </section>
        <Friends onFriendsUpdate={handleFriendsUpdate}></Friends>
        <button onClick={handleSubmit}>
          SAVE ALL
        </button>
        <Footer />
      </Wrapper>
    </>
  );
}
