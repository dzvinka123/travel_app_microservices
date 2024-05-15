import ToDoCard from './ToDo-Card';
import CreateCard from './Create-ToDo-Card';
import "./widgetstyles.css"

// add inputs for ToDoCards, fix the checking of to do cards
export default function ToDoList() {
    return (
        <section className="block to-do-block">
            <p className="todo-list-header">To-Do List</p>
            <div className="to-do-list">
                <ToDoCard />
                <CreateCard />
            </div>
        </section>
    )
}