import React from 'react';
import user from "../../img/user.svg"

export default function Friend (props) {
    const handleDel = () => {
        props.onDelete(props.email);
    }
    return (
        <button className="friends__friend" onClick={handleDel}>
            <img src={user} alt="" />
        </button>
    );
};