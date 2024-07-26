import { redraw } from "./util";

let directionX = [-1, -1, 0, 1, 1, 1, 0, -1];
let directionY = [0, 1, 1, 1, 0, -1, -1, -1];

function bfs(r, w, grid, n) {
  const visited = Array.from({ length: n }, () => Array(n).fill(false));
  let queue = [{ row: r, col: w }];

  //bfs
  while (queue.length > 0) {
    const curr = queue.shift();
    visited[curr.row][curr.col] = true;
    // if blank then reveal
    if (grid[curr.row][curr.col].text == "0")
      grid[curr.row][curr.col].setReveal();
    // go in all directions
    for (let i = 0; i < 8; i++) {
      let newRow = curr.row + directionX[i];
      let newCol = curr.col + directionY[i];
      if (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < n &&
        newCol < n &&
        !visited[newRow][newCol]
      ) {
        queue.push({ row: newRow, col: newCol });
      }
    }
  }
}

export function handleClickReveal(grid, mouse, context, n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j].isCell(mouse.x, mouse.y)) {
        grid[i][j].setReveal();
        bfs(i, j, grid, n);
      }
    }
  }
  redraw(context, grid, n);
}
