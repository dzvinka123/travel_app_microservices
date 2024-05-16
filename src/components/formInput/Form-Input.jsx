import "./Form-Input.css"
import { useRef } from 'react';


export default function FormInput({ icon, placeholder, text, name, onChange, onClick, value, className }) {
    const inputRef = useRef(null);

    const handleDivClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        if (onClick) {
            onClick();
        }
    };

    return (
        <div onClick={handleDivClick} className={`search-container-input ${className}`}>
            <img className="search-icon" src={icon} alt={`${text} Icon`} />
            <div className="search-field">
                <label htmlFor={name}>{text}</label>
                <input ref={inputRef} 
                    type="text" 
                    id={name} 
                    name={name} 
                    placeholder={placeholder} 
                    onChange={onChange}
                    value={value}
                    required 
                />
            </div>
        </div>
    );
}
