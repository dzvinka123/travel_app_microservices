import "./widgetstyles.css"
import axios from "axios";

export default function ToDoCard({ handleOnCheck, checkboxIndex, input }) {
    console.log(input);
    const onClickUpdate = (e) => {
        const done = e.target.checked;

        axios.put('http://localhost:3001/todo-list', {
            taskId: input.id,
            done: done
        })
            .then(response => {
                if (response.data.success) {
                    console.log("Task state updated successfully");
                    handleOnCheck(done, input.id);
                } else {
                    console.error("Failed to update task state:", response.data.message);
                }
            })
            .catch(error => {
                console.error("Error updating task state:", error);
            });
    }
    return (
        <div className="card-wrapper">
            <div className="checkbox-wrapper">
                <input className="inp-cbx" id={`cbx-${checkboxIndex}`} type="checkbox" checked={input.done ? input.done : 0} onChange={onClickUpdate} />
                <label className="cbx" htmlFor={`cbx-${checkboxIndex}`}>
                    <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                    </span>
                    <span>{input.task ? input.task : input}</span>
                </label>
            </div>
        </div>
    )
}
