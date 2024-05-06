import "./Form-Input.css"
import { useRef } from 'react';


export default function FormInput({ icon, placeholder, text, name, className }) {

    const inputRef = useRef(null);

    const handleDivClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div onClick={handleDivClick} className={`search-container-input ${className}`}>
            <img className="search-icon" src={icon} alt={`${text} Icon`} />
            <div className="search-field">
                <label htmlFor={name}>{text}</label>
                <input ref={inputRef} type="text" id={name} name={name} placeholder={placeholder} required />
            </div>
        </div>
    );
}