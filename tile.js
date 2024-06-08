export default class Tile {
  constructor(position, value) {
    this.x                = position.x;
    this.y                = position.y;
    this.value            = value || 2;

    this.previousPosition = null;
    this.mergedFrom       = null; // Tracks tiles that merged together
  }

  // Save position
  savePosition = () => {
    this.previousPosition = { x: this.x, y: this.y };
  }

  // Update position
  updatePosition = (position) => {
    this.x = position.x;
    this.y = position.y;
  }
} // class Tile
