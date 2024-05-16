import React, {useState} from 'react';
import plus from "../../img/add.svg"
import Friend from './Friend';
import "./Friends.css"
import axios from 'axios';

export default function Friends () {
    const [friends, setFriends] = useState([]);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const handleDeleteFriend = (emailToDelete) => {
        const updatedFriends = friends.filter(email => email !== emailToDelete);
        setFriends(updatedFriends);
        console.log(friends)
    };    
    const handleAddFriend = () => {
        if (email.trim() === "") {
            setError("Please enter an email");
            return;
        }

        if (friends.includes(email)) {
            setError("This email is already in your friends list");
            return;
        }

        // Call server endpoint to check if user exists
        axios.get(`http://localhost:3001/get-user?email=${email}`)
            .then(response => {
                const userExists = response.data.exists;
                if (userExists) {
                    setFriends([...friends,  email ]);
                    setEmail("");
                    setError("");
                } else {
                    setError(response.data.message);
                }
            })
            .catch(error => {
                console.error('Error checking user:', error);
                setError("Error checking user!");
            });
        console.log(friends)
    };
    return (
    <section className='friends'>
        <div className="friends_container _container">
            <div className="friends__title">Invite Your Friends <br></br> to Join You</div>
            <div className="friends__info">
                <div className="friends__descr">Members/Friends</div>
                <div className="friends__friends">
                        {friends.map((email, index) => (
                            <Friend key={index} email={email} onDelete={handleDeleteFriend}/>
                        ))}
                    <button onClick={handleAddFriend} className="friends__plus">
                        <img src={plus} alt="" />
                    </button>
                </div>
                <input className='friends__input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
                {error && <p className="friends__error">{error}</p>}
            </div>
        </div>
    </section>
    );
};