import { redraw, getRelativeMousePosition } from "./scripts/util";
import { handleClickReveal } from "./scripts/revealer";
import { mineCheckSum } from "./scripts/mineCheckSum";
import Cell from "./scripts/cell";
import "./style.css";
import { mineSetter } from "./scripts/mineSetter";
import { handleRightClick } from "./scripts/flagger";
import { resetTimer, startTimer } from "./scripts/timer";

let grid = [],
  n = 10,
  side = 50;
let firstClick = false;

window.onload = function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  const sizeInput = document.getElementById("sizeOfGrid");
  const difficultyInput = document.getElementById("difficulty");
  const flagNumberElement = document.getElementById("flagNumber");
  const timerElement = document.getElementById("timer");

  // Retrieve stored values or set defaults
  sizeInput.value = localStorage.getItem("gridSize") || n;
  difficultyInput.value = localStorage.getItem("difficultyLevel") || "easy";

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
    const numberOfMines = Math.floor(n * n * difficultyFactor);
    flagNumberElement.innerHTML = `${numberOfMines}`;
    mineSetter(grid, n, numberOfMines);
    mineCheckSum(context, grid, n);
    redraw(context, grid, n);

    localStorage.setItem("gridSize", sizeInput.value);
    localStorage.setItem("difficultyLevel", difficultyInput.value);

    resetTimer(timerElement);
    firstClick = false;
  };

  sizeInput.addEventListener("change", initializeGrid);
  difficultyInput.addEventListener("change", initializeGrid);

  initializeGrid();

  canvas.onclick = function (e) {
    if (!firstClick) {
      firstClick = true;
      startTimer(timerElement);
    }
    let mouse = getRelativeMousePosition(e, canvas);
    handleClickReveal(grid, mouse, context, n);
  };

  canvas.oncontextmenu = function (e) {
    e.preventDefault();
    let mouse = getRelativeMousePosition(e, canvas);
    handleRightClick(grid, mouse, context, n);
  };
};
