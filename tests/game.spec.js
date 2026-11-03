// @ts-check
import { expect, test } from "@playwright/test";

/**
 * @param {import("@playwright/test").Locator} squares
 * @param {number[]} moves
 */
async function play(squares, moves) {
    for (let i = 0; i < moves.length; i++) {
        if (i % 2 === 0) {
            await squares.nth(moves[i]).click();
        } else {
            await squares.nth(moves[i]).click({ button: "right" });
        }
    }
    return;
}

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("the board has 9 squares", async ({ page }) => {
    const squares = await page.locator(".square");
    await expect(squares).toHaveCount(9);
});

test("players take turns", async ({ page }) => {
    const squares = page.locator(".square");
    let texts;
    await play(squares, [0, 1]);
    texts = await squares.nth(0).textContent();
    expect(texts).toEqual("X");
    texts = await squares.nth(1).textContent();
    expect(texts).toEqual("O");
});

test("last player can't make another move", async ({ page }) => {
    const squares = page.locator(".square");
    let texts;

    await squares.nth(0).click();
    texts = await squares.nth(0).textContent();
    expect(texts).toEqual("X");
    await squares.nth(1).click();
    texts = await squares.nth(1).textContent();
    expect(texts).toEqual("");
});

test("taken square cannot be clicked again", async ({ page }) => {
    const squares = page.locator(".square");
    let texts;

    await play(squares, [0, 0]);
    texts = await squares.nth(0).textContent();
    expect(texts).toEqual("X");
});

test("win condition is met when a player gets three in a row", async ({ page }) => {
    const squares = page.locator(".square");

    await play(squares, [0, 1, 3, 4, 6]);
    await expect(page.getByText("Game over! X won")).toBeVisible();
});

test("game draws when all squares are filled and no player has won", async ({ page }) => {
    const squares = page.locator(".square");
    await play(squares, [0, 1, 2, 4, 3, 5, 7, 6, 8]);
    await expect(page.getByText("Draw! No winner")).toBeVisible();
});

test("reset button resets the game", async ({ page }) => {
    const squares = page.locator(".square");
    await play(squares, [0, 1, 3, 4, 6]);
    await expect(page.getByText("Game over! X won")).toBeVisible();
    await page.getByRole("button", { name: "Reset" }).click();
    await expect(page.getByText("Game over! X won")).not.toBeVisible();
});

test("last clicked square is highlighted", async ({ page }) => {
    const squares = page.locator(".square");
    await squares.nth(0).click();
    await expect(squares.nth(0)).toHaveClass(/lastcell/);
});
