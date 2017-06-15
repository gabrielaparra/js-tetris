//
var canvas = document.getElementById('tetris');
var ctx = canvas.getContext('2d');

ctx.scale(20, 20);

//OBJECTS
function Player() {
  this.position = {x: 0, y: 0};
  this.matrix = null;
  this.score = 0;
}

function Arena(width, height) {
  this.width = width;
  this.height = height;
}

Arena.prototype.createMatrix = function () {
  var matrix = [];
  while (this.height !== 0) {
    this.height -= 1;
    matrix.push(new Array(this.width).fill(0));
  }
  return matrix;
};

Arena.prototype.arenaSweep = function () {
  var rowCount = 1;
  outer: for (var y = this.length -1; y > 0; y--) {
    for (var x = 0; x < this[y].length; x++) {
      if (this[y][x] === 0) {
        continue outer;
      }
    }

    var row = this.splice(y, 1)[0].fill(0);
    this.unshift(row);
    y++;

    player.score += rowCount * 10;
    rowCount *= 2;
  }
};

function Game() {

}

Game.prototype.collide = function () {

};
