import React, {useState, useEffect} from "react";

export default function Description(props) {
    const [description, setDescription] = useState("");
    useEffect(() => {
        props.onDescriptionUpdate(description);
      }, [description, props.onDescriptionUpdate]);
    return (
        <div className="description-box">
            <div className="empty"></div>
            <div className="descriptor">
                <div>
                    <h3>Description/Notes</h3>
                </div>
                <div className="descriptor-list">
                    <div>
                        <span>Write your thoughts here</span>
                        <input onChange={(e) => setDescription(e.target.value)} type="text" />
                    </div>
                </div>
            </div>
        </div>
    );
}
