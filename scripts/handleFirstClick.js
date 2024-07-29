import { mineCheckSum } from "./mineCheckSum";

const flagCountElement = document.getElementById("flagNumber");

export function handleFirstClick(grid, mouse, context, n) {
  const minedCell = isMine(grid, mouse, n);
  if (minedCell) {
    flagCountElement.innerHTML = `${parseInt(flagCountElement.innerHTML) - 1}`;
    removeMine(grid, minedCell, context, n);
  }
}
function isMine(grid, mouse, n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j].isCell(mouse.x, mouse.y)) {
        if (grid[i][j].text === "M") {
          return { row: i, col: j };
        }
      }
    }
  }
  return null;
}

function removeMine(grid, minedCell, context, n) {
  grid[minedCell.row][minedCell.col].text = " ";
  mineCheckSum(context, grid, n);
}
