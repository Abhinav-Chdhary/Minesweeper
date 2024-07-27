import { redraw } from "./util";

const flagNumberElement = document.getElementById("flagNumber");

const setCounter = (count) => {
  flagNumberElement.innerHTML = `${count}`;
};

export function handleRightClick(grid, mouse, context, n) {
  let flagCount = parseInt(flagNumberElement.innerHTML);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j].isCell(mouse.x, mouse.y)) {
        // if already flagged remove it
        if (grid[i][j].isFlagged) {
          grid[i][j].toggleFlagged();
        }
        // if not flagged and not revealed we can flag it
        else if (!grid[i][j].isFlagged && !grid[i][j].isRevealed) {
          setCounter(flagCount - 1);
          grid[i][j].toggleFlagged();
        }
      }
    }
  }
  redraw(context, grid, n);
}
