import { redraw } from "./util";
import { mineCheckSum } from "./mineCheckSum";
import Cell from "./cell";
import { mineSetter } from "./mineSetter";

export const initializeGrid = (
  canvas,
  context,
  sizeInput,
  difficultyInput,
  flagNumberElement,
  timerElement,
  resetTimer
) => {
  let n = parseInt(sizeInput.value);
  let difficultyFactor;

  if (difficultyInput.value === "easy") difficultyFactor = 1 / 6;
  else if (difficultyInput.value === "med") difficultyFactor = 1 / 5;
  else difficultyFactor = 1 / 4;

  const side = 50;
  canvas.width = n * side;
  canvas.height = n * side;

  let grid = [];
  for (let i = 0; i < n; i++) {
    grid[i] = [];
    for (let j = 0; j < n; j++) {
      grid[i][j] = new Cell(side * i, side * j, side);
    }
  }
  const numberOfMines = Math.floor(n * n * difficultyFactor);
  flagNumberElement.innerHTML = `${numberOfMines}`;
  mineSetter(grid, n, numberOfMines);
  mineCheckSum(context, grid, n);
  redraw(context, grid, n);

  localStorage.setItem("gridSize", sizeInput.value);
  localStorage.setItem("difficultyLevel", difficultyInput.value);

  resetTimer(timerElement);
  return {
    n: n,
    grid: grid,
  };
};
