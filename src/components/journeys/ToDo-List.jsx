import React, { useState, useEffect } from 'react';
import ToDoCard from './ToDo-Card';
import CreateCard from './Create-ToDo-Card';
import "./widgetstyles.css"

export default function ToDoList(props) {
    const [cards, setCards] = useState(props.toDos);
    const addNewCard = (newCard) => {
        console.log("New card to be added:", newCard);
        setCards(prevCards => {
            const updatedCards = [...prevCards, newCard];
            return updatedCards;
        });
    };
    const handleOnCheck = (done, id) => {
        if (props.cardId) {
            setCards(prevCards =>
                prevCards.map(card =>
                    card.id === id ? { ...card, done } : card
                )
            );
        }
    };
    useEffect(() => {
        props.handleToDoUpdate(cards);
        console.log(cards)
    }, [cards, props.handleToDoUpdate])
    return (
        <section className="block to-do-block">
            <p className="todo-list-header">To-Do List</p>
            <div className="to-do-list">
                {cards.map((card, index) => (
                    <ToDoCard handleOnCheck={handleOnCheck} key={index} checkboxIndex={index} input={card} />
                ))}
                <CreateCard card_id={props.cardId} addNewCard={addNewCard} />
            </div>
        </section>
    );
}
