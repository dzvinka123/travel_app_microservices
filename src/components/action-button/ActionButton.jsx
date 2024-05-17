import './ActionButton.css';


export default function ActionButton(props) {
    return(
        <button onClick={props.handleSubmit} type="submit" className="search-button">{props.text}</button>
    )
}
