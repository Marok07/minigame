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
    "sets the winner when positions %j contain the X mark",
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
test.each(WIN_POSITIONS)(
    "sets the winner when positions %j contain the O mark",
    (...positions) => {
        const board = Array(9).fill(null);
        positions.forEach((position) => {
        board[position] = "O";
        });
        const setWinner = jest.fn();
        const setGameOver = jest.fn();
        win_check(board, "O", setWinner, setGameOver);
        expect(setWinner).toHaveBeenCalledWith("O");
        expect(setGameOver).toHaveBeenCalledWith(true);
    },
);

test("stalemate: sets game over when all positions are filled and no winner", () => {
    const board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    const setWinner = jest.fn();
    const setGameOver = jest.fn();
    win_check(board, "X", setWinner, setGameOver);
    expect(setWinner).not.toHaveBeenCalled();
    expect(setGameOver).toHaveBeenCalledWith(true);
});

test("ongoing game: does not set winner or game over when there are empty positions", () => {
    const board = ["X", "O", null, null, "X", null, null, null, "O"];
    const setWinner = jest.fn();
    const setGameOver = jest.fn();
    win_check(board, "X", setWinner, setGameOver);
    expect(setWinner).not.toHaveBeenCalled();
    expect(setGameOver).not.toHaveBeenCalled();
});

