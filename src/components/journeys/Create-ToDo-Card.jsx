
import React, { useEffect, useState } from 'react';
import add from '../../img/add.svg';
import "./widgetstyles.css";
import axios from 'axios';

export default function CreateCard({ card_id, addNewCard }) {
    const [inputValue, setInputValue] = useState('');
    //const [newCard, setNewCard] = useState();
    const handleAddCard = () => {
        if (inputValue.trim() !== '') {
            axios.post(`http://localhost:3001/todo-list`, {task: inputValue.trim(), done: 0, card_id: card_id})
                .then(response => {
                    const { success, message, taskId } = response.data;
                    if (success) {
                        const newCard = { id: taskId, task: inputValue.trim(), done: 0, card_id: card_id };
                        addNewCard(newCard);
                        setInputValue('');   
                    } else {
                        console.error("Failed to fetch journeys:", response.data.message);
                    }
                })
                .catch(error => {
                    console.error("Failed to fetch journeys:", error);
                });
        }
    };
    // useEffect(() => {
    //     addNewCard(newCard);
    //   }, [newCard, addNewCard])


    return (
        <div className="cards-container">
            <button className="create-cards-button" onClick={handleAddCard}>
                <img src={add} alt="Add Card icon" />
            </button>
            <input
                placeholder="Add your tasks here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="create-cards-input"
                type="text"
            />
        </div>
    );
}
