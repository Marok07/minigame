import { win_check } from "../src/utils/gameUtils.js";


describe("win_check function", () => {
test("win_check returns the correct winner for a winning board", async () => {
    const winningBoard = [ 'X', 'X', 'X', undefined, undefined, undefined, undefined, undefined, undefined ];
    expect(win_check(winningBoard)).toBe('X');
});

test("win_check returns null for a draw board", async () => {
    const drawBoard = [ 'X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X' ];
    expect(win_check(drawBoard)).toBe(null);
});

test("win_check returns undefined for an ongoing game", async () => {
    const ongoingBoard = [ 'X', 'O', undefined, undefined, 'X', undefined, undefined, undefined, 'O' ];
    expect(win_check(ongoingBoard)).toBe(undefined);
});

test("win_check returns the correct winner for a winning board with O", async () => {
    const winningBoardO = [ 'O', 'O', 'O', undefined, undefined, undefined, undefined, undefined, undefined ];
    expect(win_check(winningBoardO)).toBe('O');
});

test("win_check returns undefined for an empty board", async () => {
    const emptyBoard = [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ];
    expect(win_check(emptyBoard)).toBe(undefined);
});

});