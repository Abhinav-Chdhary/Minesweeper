import { resetTimer } from "./timer";
import { redraw } from "./util";
import { checkWin, revealAll } from "./checkWin";

let directionX = [-1, 0, 1, 0];
let directionY = [0, 1, 0, -1];

const timerElement = document.getElementById("timer");
const gameOverScreen = document.getElementById("gameOverScreen");

const displayGameOver = () => {
  gameOverScreen.style.display = "block";
};

function bfs(r, c, grid, n) {
  let queue = [{ row: r, col: c }];
  const symbol = grid[r][c].text;

  //bfs
  while (queue.length > 0) {
    const curr = queue.shift();

    if (grid[curr.row][curr.col].text !== symbol) continue;
    // go in all directions
    for (let i = 0; i < 4; i++) {
      let newRow = curr.row + directionX[i];
      let newCol = curr.col + directionY[i];

      // if valid and equal to starting symbol then reveal
      if (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < n &&
        newCol < n &&
        !grid[newRow][newCol].isRevealed
      ) {
        if (grid[newRow][newCol].text === "M") continue;
        grid[newRow][newCol].setReveal();
        queue.push({ row: newRow, col: newCol });
      }
    }
  }
}

export function handleClickReveal(grid, mouse, context, n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j].isCell(mouse.x, mouse.y)) {
        // if flagged then ignore the cell
        if (grid[i][j].isFlagged) break;
        else if (grid[i][j].text === "M") {
          revealAll(context, grid, n);
          displayGameOver();
          resetTimer(timerElement);
          return;
        } else {
          grid[i][j].setReveal();
          bfs(i, j, grid, n);
        }
      }
    }
  }
  if (checkWin(context, grid, n)) return;
  redraw(context, grid, n);
}
