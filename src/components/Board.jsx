import { useState } from "react";
import { LEFT, RIGHT, Square } from "./Square";

const PLAYER_X = "X";
const PLAYER_O = "O";

export function Board() {
    const [status, setStatus] = useState([undefined, undefined, undefined]);

    function handleClick(idx, mouseButton) {
        let newValue;
        if (mouseButton === LEFT) {
            newValue = PLAYER_X;
        } else if (mouseButton === RIGHT) {
            newValue = PLAYER_O;
        } else return;
        const newStatus = status.map((value, index) => (index === idx ? newValue : value));
        setStatus(newStatus);
    }
    console.log(status);
    return (
        <>
            <div className="board">
                <div className="board-row">
                    <Square value={status[0]} onSquareClick={(mouseButton) => handleClick(0, mouseButton)} />
                    <Square value={status[1]} onSquareClick={(mouseButton) => handleClick(1, mouseButton)} />
                    <Square value={status[2]} onSquareClick={(mouseButton) => handleClick(2, mouseButton)} />
                </div>
            </div>
        </>
    );
}
