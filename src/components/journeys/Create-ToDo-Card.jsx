
import React, { useState } from 'react';
import add from '../../img/add.svg';
import "./widgetstyles.css";

export default function CreateCard({ addNewCard }) {
    const [inputValue, setInputValue] = useState('');

    const handleAddCard = () => {
        if (inputValue.trim() !== '') {
            addNewCard(inputValue.trim());
            setInputValue('');
        }
    };

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
