export default class Grid {
  constructor(size) {
    this.size  = size;
    this.cells = [];

    this.build();
  }

  // Build a grid of the specified size
  build = () => {
    for (var x = 0; x < this.size; x++) {
      var row = this.cells[x] = [];

      for (var y = 0; y < this.size; y++) {
        row.push(null);
      }
    }
  }

  // Find the first available random position
  randomAvailableCell = () => {
    var cells = this.availableCells();

    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  }

  availableCells = () => {
    var cells = [];

    this.eachCell((x, y, tile) => {
      if (!tile) {
        cells.push({ x: x, y: y });
      }
    });

    return cells;
  }

  // Call callback for every cell
  eachCell = (callback) => {
    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        callback(x, y, this.cells[x][y]);
      }
    }
  }

  // Check if there are any cells available
  cellsAvailable = () => {
    return !!this.availableCells().length;
  }

  // Check if the specified cell is taken
  cellAvailable = (cell) => {
    return !this.cellOccupied(cell);
  }

  cellOccupied = (cell) => {
    return !!this.cellContent(cell);
  }

  cellContent = (cell) => {
    if (this.withinBounds(cell)) {
      return this.cells[cell.x][cell.y];
    } else {
      return null;
    }
  }

  // Inserts a tile at its position
  insertTile = (tile) => {
    this.cells[tile.x][tile.y] = tile;
  }

  removeTile = (tile) => {
    this.cells[tile.x][tile.y] = null;
  }

  withinBounds = (position) => {
    return position.x >= 0 && position.x < this.size &&
          position.y >= 0 && position.y < this.size;
  }
} // class Grid
