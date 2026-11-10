import { win_check } from "./utils/gameUtils.js";

const WIN_POSITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

test.each(WIN_POSITIONS)(
    "sets the winner when positions %j contain the same mark",
    (...positions) => {
        const board = Array(9).fill(null);
        positions.forEach((position) => {
        board[position] = "X";
        });
        const setWinner = jest.fn();
        const setGameOver = jest.fn();
        win_check(board, "X", setWinner, setGameOver);
        expect(setWinner).toHaveBeenCalledWith("X");
        expect(setGameOver).toHaveBeenCalledWith(true);
    },
);