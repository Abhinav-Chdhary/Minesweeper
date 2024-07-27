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

export function drawFlag(ctx, x, y, side) {
  // Calculate the triangle's base and height
  const triangleBase = side / 2;

  // Calculate triangle's vertices
  const triangleX1 = x + side / 4;
  const triangleY1 = y + side / 4;
  const triangleX2 = triangleX1;
  const triangleY2 = triangleY1 + triangleBase;
  const triangleX3 = triangleX1 + triangleBase;
  const triangleY3 = triangleY1 + triangleBase/2;

  // Draw the triangle
  ctx.beginPath();
  ctx.moveTo(triangleX1, triangleY1);
  ctx.lineTo(triangleX2, triangleY2);
  ctx.lineTo(triangleX3, triangleY3);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();

  // Draw the flag pole
  const poleWidth = 2;
  const poleHeight = (5*triangleBase)/4;
  ctx.beginPath();
  ctx.rect(triangleX1, triangleY1, poleWidth, poleHeight);
  ctx.fillStyle = "black";
  ctx.fill();

  // Draw the base of the flag pole
  const baseWidth = poleWidth * 4;
  const baseHeight = poleWidth;
  ctx.beginPath();
  ctx.rect(triangleX1 - baseWidth/3, triangleY1 + poleHeight, baseWidth, baseHeight);
  ctx.fillStyle = "black";
  ctx.fill();
}
