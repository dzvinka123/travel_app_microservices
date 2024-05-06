import './ActionButton.css';


export default function ActionButton(props) {
    return(
        <button type="submit" class="search-button">{props.text}</button>
    )
}