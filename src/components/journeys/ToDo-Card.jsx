

export default function ToDoCard({ input }) {
    return (
        <div className="card-container">
            <label className="container">{input} 
                <input type="checkbox" />
                <span className="checkmark"></span>
            </label>
        </div>
    )
}
