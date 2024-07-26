import { redraw, getRelativeMousePosition } from "./scripts/util";
import Cell from "./scripts/cell";
import "./style.css";

let grid = [],
  n = 10,
  side = 50;

window.onload = function () {
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  for (let i = 0; i < n; i++) {
    grid[i] = [];
    for (let j = 0; j < n; j++) {
      grid[i][j] = new Cell(i + side * i, j + side * j, side);
    }
  }

  canvas.onclick = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    handleClickReveal(grid, mouse, context);
  };

  redraw(context, grid, n);
};

function handleClickReveal(grid, mouse, context) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j].isCell(mouse.x, mouse.y)) {
        grid[i][j].setReveal();
      }
    }
  }
  redraw(context, grid, n);
}
