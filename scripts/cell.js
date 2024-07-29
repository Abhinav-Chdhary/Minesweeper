import { drawFlag } from "./util";

export default class Cell {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.text = " ";
    this.isRevealed = true;
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
}
