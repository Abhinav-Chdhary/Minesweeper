import { redraw } from "./util";

const gameWinScreen = document.getElementById("youWinScreen");

export function checkWin(context, grid, n) {
  let countNotRevealed = 0,
    numberOfMines = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!grid[i][j].isRevealed) {
        ++countNotRevealed;
      }
      if (grid[i][j].text === "M") ++numberOfMines;
    }
  }

  if (countNotRevealed === numberOfMines) {
    revealAll(context, grid, n);
    gameWinScreen.style.display = "block";
    return true;
  }
  return false;
}

export function revealAll(context, grid, n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j].isFlagged = false;
      grid[i][j].setReveal();
    }
  }
  redraw(context, grid, n);
}
