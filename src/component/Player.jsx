import { useState } from "react"

export default function Player({initalName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [PlayerName, setPlayerName] = useState(initalName);

    function handelEditClick() {
        setIsEditing((editing) => !editing); // best practise update state based in pravious state value
        // setIsEditing(!isEditing);
        if(isEditing) {
            onChangeName(symbol, PlayerName)
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{PlayerName}</span>;
    if (isEditing) { 
        editablePlayerName = <input type="text"  required value={PlayerName} onChange={handleChange}/>;
    }
    return (
        <li className= {isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handelEditClick}>{isEditing ? 'Save': 'Edit'}</button>
        </li>
    )
}