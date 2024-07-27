import { redraw } from "./util";

let directionX = [-1, -1, 0, 1, 1, 1, 0, -1];
let directionY = [0, 1, 1, 1, 0, -1, -1, -1];

export function mineCheckSum(context, grid, n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j].text != " ") continue;
      let count = 0;
      // check number of mines around every cell
      for (let d = 0; d < 8; d++) {
        let newRow = i + directionX[d];
        let newCol = j + directionY[d];
        if (newRow >= 0 && newCol >= 0 && newRow < n && newCol < n) {
          if (grid[newRow][newCol].text == "M") ++count;
        }
      }
      if (count > 0) grid[i][j].setText(count.toString());
    }
  }
  redraw(context, grid, n);
}
