import { getRelativeMousePosition } from "./scripts/util";
import { handleClickReveal } from "./scripts/revealer";
import { handleRightClick } from "./scripts/flagger";
import { startTimer, resetTimer } from "./scripts/timer";
import { initializeGrid } from "./scripts/initializeGrid";
import "./style.css";
import { handleFirstClick } from "./scripts/handleFirstClick";

let grid = [],
  n = 10,
  side = 50;
let firstClicked = false;

window.onload = function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  const sizeInput = document.getElementById("sizeOfGrid");
  const difficultyInput = document.getElementById("difficulty");
  const flagNumberElement = document.getElementById("flagNumber");
  const timerElement = document.getElementById("timer");
  const gameOverScreen = document.getElementById("gameOverScreen");
  const retryButton = document.getElementById("retryButton");

  sizeInput.value = localStorage.getItem("gridSize") || 10;
  difficultyInput.value = localStorage.getItem("difficultyLevel") || "easy";

  const initialize = () => {
    const initialDetails = initializeGrid(
      canvas,
      context,
      sizeInput,
      difficultyInput,
      flagNumberElement,
      timerElement,
      resetTimer
    );
    n = initialDetails.n;
    grid = initialDetails.grid;
    firstClicked = false;
    gameOverScreen.style.display = "none";
  };

  sizeInput.addEventListener("change", initialize);
  difficultyInput.addEventListener("change", initialize);
  retryButton.addEventListener("click", initialize);

  initialize();

  canvas.onclick = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    if (!firstClicked) {
      firstClicked = true;
      startTimer(timerElement);
      handleFirstClick(grid, mouse, context, n);
    }
    handleClickReveal(grid, mouse, context, n);
  };

  canvas.oncontextmenu = function (e) {
    e.preventDefault();
    let mouse = getRelativeMousePosition(e, canvas);
    handleRightClick(grid, mouse, context, n);
  };
};
