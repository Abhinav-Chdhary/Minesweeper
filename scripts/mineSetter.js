function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}
export function mineSetter(grid, n, mines) {
  while (mines > 0) {
    let row = getRandomInt(n);
    let col = getRandomInt(n);
    if (grid[row][col].text !== "M") {
      grid[row][col].setText("M");
      --mines;
    }
  }
}
