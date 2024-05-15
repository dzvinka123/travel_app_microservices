import add from '../../img/add.svg';
import "./widgetstyles.css"

// button onclick -> take text -> create new ToDoCard with that text
export default function CreateCard() {
    return (
        <div className="cards-container">
            <button className="create-cards-button">
                <img src={add} alt="Add Card icon" />
            </button>
            <input placeholder="Add your tasks here..." id="newCard" className="create-cards-input" type="text"></input>
        </div>
    )
}