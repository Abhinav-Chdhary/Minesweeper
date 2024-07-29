import { drawFlag } from "./util";

export default class Cell {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.text = " ";
    this.isRevealed = false;
    this.isFlagged = false;
  }
  drawCell(context) {
    context.fillStyle = "white";
    if (this.isRevealed) context.fillStyle = "#eed74b";
    context.fillRect(this.x, this.y, this.side, this.side);

    if (this.isFlagged) {
      drawFlag(context, this.x, this.y, this.side);
    }

    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.strokeRect(this.x, this.y, this.side + 1, this.side + 1);

    if (this.isRevealed) {
      this.drawText(context);
    }
  }
  drawText(context) {
    if (this.text === "M") {
      this.drawMine(context);
      return;
    }
    context.font = "20px Comic Sans MS";
    context.textAlign = "center";
    context.textBaseline = "middle";
    if (this.text === "M") context.fillStyle = "black";
    else if (this.text === "1") context.fillStyle = "blue";
    else if (this.text === "2") context.fillStyle = "green";
    else context.fillStyle = "red";

    const textX = this.x + this.side / 2;
    const textY = this.y + this.side / 2;

    context.fillText(this.text, textX, textY);
  }
  isCell(px, py) {
    return (
      px >= this.x &&
      px <= this.x + this.side &&
      py >= this.y &&
      py <= this.y + this.side
    );
  }
  setReveal() {
    this.isRevealed = true;
  }
  setText(text) {
    this.text = text;
  }
  toggleFlagged() {
    this.isFlagged = !this.isFlagged;
  }
  drawMine(context) {
    const radius = this.side / 4;
    const centerX = this.x + this.side / 2;
    const centerY = this.y + this.side / 2;

    // Draw the black circle
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();

    const lineLength = radius+3; // Adjust line length as needed
    const lineWidth = 2;

    context.strokeStyle = "black";
    context.lineWidth = lineWidth;

    // Draw lines radiating from the circle's center
    const angles = [
      0,
      Math.PI / 3,
      (2 * Math.PI) / 3,
      Math.PI,
      (4 * Math.PI) / 3,
      (5 * Math.PI) / 3,
    ];
    angles.forEach((angle) => {
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.lineTo(
        centerX + lineLength * Math.cos(angle),
        centerY + lineLength * Math.sin(angle)
      );
      context.stroke();
    });
  }
}
