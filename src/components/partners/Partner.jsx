import React from 'react';
import "./Partner.css"

export default function ({imagePath}) {
    return (
        <div className="partners__partner">
            <img src={imagePath} alt=""></img>
        </div>
    );
};

