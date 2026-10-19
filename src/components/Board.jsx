import { useState } from "react";
import { Square } from "./Square";

export function Board() {
    const [status, setStatus] = useState([1, 2, 3]);
    function handleClick(idx) {
        const newStatus = status.map((value, index) => (index === idx ? value + 1 : value));
        setStatus(newStatus);
    }
    console.log(status);
    return (
        <>
            <div className="board">
                <div className="board-row">
                    <Square value={status[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={status[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={status[2]} onSquareClick={() => handleClick(2)} />
                </div>
            </div>
        </>
    );
}
