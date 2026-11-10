import { useState, useRef } from "react";
import { PLAYER_X, PLAYER_O, Square } from "./Square";
import { win_check } from "../utils/gameUtils.js";

export function Board({ onGameEnd }) {
    const BOARD_SIDES = 3;
    const BOARD_INDICES = [...Array(BOARD_SIDES).keys()]; // [0, 1, 2]
    const CELL_COUNT = BOARD_SIDES * BOARD_SIDES;

    const [status, setStatus] = useState(new Array(CELL_COUNT).fill(undefined));
    let lastPlayer = useRef();

    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [lastCell, setLastCell] = useState();

    function handlePlayAgain() {
        setStatus(new Array(CELL_COUNT).fill(undefined));
        setLastCell(undefined);
        setWinner(undefined);
        setGameOver(false);
        lastPlayer.current = undefined;
    }
    function handleClick(idx, player) {
        if (player !== PLAYER_X && player !== PLAYER_O) return;
        if (lastPlayer.current === player) return;
        if (status[idx]) return;
        if (gameOver) return;
        lastPlayer.current = player;
        const newStatus = status.map((value, index) => (index === idx ? player : value));
        win_check(newStatus, player, setWinner, setGameOver);
        if (winner) {
            onGameEnd(winner);
        }
        setLastCell(idx);
        setStatus(newStatus);
    }
    return (
        <>
            <div className="board">
                {BOARD_INDICES.map((rowIndex) => (
                    <div className="board-row">
                        {BOARD_INDICES.map((columnIndex) => {
                            const index = rowIndex * BOARD_SIDES + columnIndex;
                            return (
                                <Square
                                    value={status[index]}
                                    highlight={index === lastCell}
                                    onSquareClick={(player) => handleClick(index, player)}
                                />
                            );
                        })}
                    </div>
                ))}
                {gameOver && winner && <div>Game over! {winner} won</div>}
                {gameOver && !winner && <div>Draw! No winner</div>}
                {gameOver && <button onClick={handlePlayAgain}>Reset</button>}
            </div>
        </>
    );
}
