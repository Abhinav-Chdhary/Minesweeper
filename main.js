import { redraw, getRelativeMousePosition } from "./scripts/util";
import { handleClickReveal } from "./scripts/revealer";
import Cell from "./scripts/cell";
import "./style.css";

let grid = [],
  n = 10,
  side = 50;

window.onload = function () {
  const canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  canvas.width = n * side;
  canvas.height = n * side;

  for (let i = 0; i < n; i++) {
    grid[i] = [];
    for (let j = 0; j < n; j++) {
      grid[i][j] = new Cell(side * i, side * j, side);
    }
  }
  grid[0][0].setText("3");
  grid[n - 1][n - 1].setText("3");

  canvas.onclick = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    handleClickReveal(grid, mouse, context, n);
  };

  redraw(context, grid, n);
};
