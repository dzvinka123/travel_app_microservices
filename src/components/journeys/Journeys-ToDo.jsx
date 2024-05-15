import React, { useState } from 'react';
import ToDoCard from './ToDo-Card';
import CreateCard from './Create-ToDo-Card';
import "./widgetstyles.css"

// add inputs for ToDoCards, fix the checking of to do cards
export default function ToDoList() {
    const [cards, setCards] = useState([]);

    const addNewCard = (newCardText) => {
        setCards([...cards, newCardText]);
    };

    return (
        <section className="block to-do-block">
            <p className="todo-list-header">To-Do List</p>
            <div className="to-do-list">
                {cards.map((card, index) => (
                    <ToDoCard key={index} input={card} />
                ))}
                <CreateCard addNewCard={addNewCard} />
            </div>
        </section>
    );
}