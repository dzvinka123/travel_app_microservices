import ToDoCard from './ToDo-Card';
import "./widgetstyles.css"

// add input for ToDoCard
export default function ToDoList() {
    return (
        <section className="block to-do-block">
            <h3 className="todo-list-header">To-Do List</h3>
            <div className="to-do-list">
                <ToDoCard />
            </div>
        </section>
    )
}