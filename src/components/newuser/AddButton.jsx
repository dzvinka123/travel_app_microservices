import "./createdTripUser.css";

export default function AddButton({plus, clas, text}) {
    return (
        <button className={clas}>{text}<img src={plus} /></button>
    );
}