import add from '../../img/add.svg';

// button onclick -> take text -> create new ToDoCard with that text
export default function CreateCard() {
    return (
        <div className="card-container">
            <button>
                <img src={add} alt="Add Card icon" />
            </button>
            <input value="Add your tasks here..." id="newCard"></input>
        </div>
    )
}