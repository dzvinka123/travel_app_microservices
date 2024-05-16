import React from 'react';
import user from "../../img/user.svg"

export default function Friend () {
    const friends = [];
    return (
        <button className="friends__friend">
            <img src={user} alt="" />
        </button>
    );
};