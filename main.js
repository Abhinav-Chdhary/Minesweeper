import { redraw, getRelativeMousePosition } from "./scripts/util";
import { handleClickReveal, mineCheckSum } from "./scripts/revealer";
import Cell from "./scripts/cell";
import "./style.css";
import { mineSetter } from "./scripts/mineSetter";

let grid = [],
  n = 10,
  side = 50;

window.onload = function () {
  const canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  canvas.width = n * side;
  canvas.height = n * side;

  // create grid
  for (let i = 0; i < n; i++) {
    grid[i] = [];
    for (let j = 0; j < n; j++) {
      grid[i][j] = new Cell(side * i, side * j, side);
    }
  }

  //set mines
  mineSetter(grid, n, (n * n) / 5);
  mineCheckSum(context, grid, n);
  redraw(context, grid, n);

  canvas.onclick = function (e) {
    let mouse = getRelativeMousePosition(e, canvas);
    handleClickReveal(grid, mouse, context, n);
  };
};
