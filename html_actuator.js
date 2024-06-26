export default class HTMLActuator {
  constructor() {
    this.tileContainer    = document.querySelector(".tile-container");
    this.scoreContainer   = document.querySelector(".score-container");
    this.bestContainer    = document.querySelector(".best-container");
    this.messageContainer = document.querySelector(".game-message");
    this.score = 0;
  }

  actuate = (grid, metadata) => {
    var self = this;

    window.requestAnimationFrame(() => {
      self.clearContainer(self.tileContainer);

      grid.cells.forEach((column) => {
        column.forEach((cell) => {
          if (cell) {
            self.addTile(cell);
          }
        });
      });

      self.updateScore(metadata.score);

      if (metadata.over) self.message(false); // You lose
      if (metadata.won) self.message(true); // You win!
    });
  }

  restart = () => {
    this.clearMessage();
  }

  clearContainer = (container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  addTile = (tile) => {
    var self = this;

    var element   = document.createElement("div");
    var position  = tile.previousPosition || { x: tile.x, y: tile.y };
    var positionClass = this.positionClass(position);

    // We can't use classlist because it somehow glitches when replacing classes
    var classes = ["tile", "tile-" + tile.value, positionClass];
    this.applyClasses(element, classes);

    element.textContent = tile.value;

    if (tile.previousPosition) {
      // Make sure that the tile gets rendered in the previous position first
      window.requestAnimationFrame(() => {
        classes[2] = self.positionClass({ x: tile.x, y: tile.y });
        self.applyClasses(element, classes); // Update the position
      });
    } else if (tile.mergedFrom) {
      classes.push("tile-merged");
      this.applyClasses(element, classes);

      // Render the tiles that merged
      tile.mergedFrom.forEach((merged) => {
        self.addTile(merged);
      });
    } else {
      classes.push("tile-new");
      this.applyClasses(element, classes);
    }

    // Put the tile on the board
    this.tileContainer.appendChild(element);
  }

  applyClasses = (element, classes) => {
    element.setAttribute("class", classes.join(" "));
  }

  normalizePosition = (position) => {
    return { x: position.x + 1, y: position.y + 1 };
  }

  positionClass = (position) => {
    position = this.normalizePosition(position);
    return "tile-position-" + position.x + "-" + position.y;
  }

  updateScore = (score) => {
    this.clearContainer(this.scoreContainer);

    var difference = score - this.score;
    this.score = score;

    this.scoreContainer.textContent = this.score;

    if (difference > 0) {
      var addition = document.createElement("div");
      addition.classList.add("score-addition");
      addition.textContent = "+" + difference;

      this.scoreContainer.appendChild(addition);
    }
  }

  message = (won) => {
    var type    = won ? "game-won" : "game-over";
    var message = won ? "You win!" : "Game over!"

    // if (ga) ga("send", "event", "game", "end", type, this.score);

    this.messageContainer.classList.add(type);
    this.messageContainer.getElementsByTagName("p")[0].textContent = message;
  }

  clearMessage = () => {
    this.messageContainer.classList.remove("game-won", "game-over");
  }
} // class HTMLActuator
