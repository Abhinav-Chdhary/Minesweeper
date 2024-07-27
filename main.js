import { redraw, getRelativeMousePosition } from "./scripts/util";
import { handleClickReveal } from "./scripts/revealer";
import { mineCheckSum } from "./scripts/mineCheckSum";
import Cell from "./scripts/cell";
import "./style.css";
import { mineSetter } from "./scripts/mineSetter";
import { handleRightClick } from "./scripts/flagger";

let grid = [],
  n = 10,
  side = 50;

window.onload = function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  const sizeInput = document.getElementById("sizeOfGrid");
  const difficultyInput = document.getElementById("difficulty");

  const initializeGrid = () => {
    n = parseInt(sizeInput.value);
    let difficultyFactor;

    if (difficultyInput.value === "easy") difficultyFactor = 1 / 6;
    else if (difficultyInput.value === "med") difficultyFactor = 1 / 5;
    else difficultyFactor = 1 / 4;

    canvas.width = n * side;
    canvas.height = n * side;

    grid = [];
    for (let i = 0; i < n; i++) {
      grid[i] = [];
      for (let j = 0; j < n; j++) {
        grid[i][j] = new Cell(side * i, side * j, side);
      }
    }

    mineSetter(grid, n, n * n * difficultyFactor);
    mineCheckSum(context, grid, n);
    redraw(context, grid, n);
  };

  sizeInput.addEventListener("change", initializeGrid);
  difficultyInput.addEventListener("change", initializeGrid);

  initializeGrid();

  canvas.onclick = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    handleClickReveal(grid, mouse, context, n);
  };
  canvas.oncontextmenu = function(e){
    e.preventDefault();
    let mouse = getRelativeMousePosition(e, canvas);
    handleRightClick(grid, mouse, context, n);
  }
};
