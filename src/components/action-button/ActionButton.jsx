import './ActionButton.css';


export default function ActionButton(props) {
    return(
        <button type="submit" className="search-button">{props.text}</button>
    )
}
