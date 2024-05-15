import "./widgetstyles.css"

export default function ToDoCard({ input }) {
    return (
        <div className="card-wrapper">
            <div className="checkbox-wrapper">
                <input className="inp-cbx" id="cbx" type="checkbox" />
                <label className="cbx" htmlFor="cbx">
                    <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                    </span>
                    <span>{input}</span>
                </label>
            </div>
        </div>
    )
}
