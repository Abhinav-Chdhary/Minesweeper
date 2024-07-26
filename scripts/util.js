export function redraw(context, grid, n) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.rect(0, 0, canvas.width, canvas.height);
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        grid[i][j].drawCell(context);
      }
    }
  }

  export function getRelativeMousePosition(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return {
      x,
      y,
    };
  }