import Cell from "./scripts/cell";
import "./style.css";

let grid = [], n = 10, side = 50;

window.onload = function () {
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  for (let i = 0; i < n; i++) {
    grid[i] = [];
    for (let j = 0; j < n; j++) {
      grid[i][j] = new Cell(i+side*i, j+side*j, side);
    }
  }

  redraw(context);
};

function redraw(context) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j].drawCell(context);
    }
  }
}
