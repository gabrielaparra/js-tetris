var canvas = document.getElementById('tetris');
var ctx = canvas.getContext('2d');

ctx.scale(20, 20);
//context.scale(scalewidth,scaleheight);

function arenaSweep() {
  var rowCount = 1;
  outer: for (var y = arena.length -1; y > 0; y--) {
    for (var x = 0; x < arena[y].length; x++) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }

    var row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    y++;

    player.score += rowCount * 10;
    rowCount *= 2;
  }
}

function collide(arena, player) {
  var m = player.matrix;
  //'m' stands for 'matrix', this would be the current randomly chosed piece
  var o = player.position;
  //'o' stands for 'offset', this would be the current position of the piece

  for (var y = 0; y < m.length; y++) {
    for (var x = 0; x < m[y].length; x++) {
      //Iterating over the player piece
      if (m[y][x] !== 0 &&
         //checks if the position in the piece's matrix is different from zero
         (arena[y + o.y] &&
         //checks if the arena's row is occupied
          arena[y + o.y][x + o.x]) !== 0) {
         //access the child of the row
        return true;
        //there is a collision
       }
     }
   }
   return false;
   //no collision was found
 }

//The sole purpose of this function is to create the arena 12x20
//but, having it this way the code can be re-used to create other grids
function createMatrix(width, height) {
  var matrix = [];
  while (height !== 0) {
    height -= 1;
    matrix.push(new Array(width).fill(0));
  }
  return matrix;
}

function createPiece(type)
{
  if (type === 'I') {
    return [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ];
  }
  else if (type === 'L') {
    return [
      [0, 2, 0],
      [0, 2, 0],
      [0, 2, 2],
    ];
  } else if (type === 'J') {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0],
      ];
  }
  else if (type === 'O') {
    return [
      [4, 4],
      [4, 4],
    ];
  }
  else if (type === 'Z') {
    return [
      [5, 5, 0],
      [0, 5, 5],
      [0, 0, 0],
    ];
  } else if (type === 'S') {
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
  }
  else if (type === 'T') {
    return [
      [0, 7, 0],
      [7, 7, 7],
      [0, 0, 0],
    ];
  }
}

function drawMatrix (matrix, offset) {
  matrix.forEach( function (row, y) {
    row.forEach( function (value, x) {
      if (value !==0) {
        ctx.fillStyle = colors[value];
        ctx.fillRect(x + offset.x,
                     y + offset.y,
                     1, 1);
      }
    });
  });
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(arena, {x: 0, y: 0});
  drawMatrix(player.matrix, player.position);
}

//this function copies all the values from the player piece
//into the right position in the arena
function merge (arena, player) {
  player.matrix.forEach( function(row, y) {
    row.forEach( function(value, x) {
      if (value !== 0) {
        arena[y + player.position.y][x + player.position.x] = value;
      }
    });
  });
}

function rotate(matrix, direction) {
  for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < y; ++x) {
      [
          matrix[x][y],
          matrix[y][x],
      ] = [
          matrix[y][x],
          matrix[x][y],
      ];
    //ES6, destructuring assignment
    }
  }

  if (direction > 0) {
    matrix.forEach( function(row) {
      return row.reverse();
    });
  }
  else {
    return matrix.reverse();
  }
}

function playerDrop() {
  player.position.y += 1;
  //if there's a collision when a piece is dropped
  if (collide(arena, player)) {
    player.position.y -=1;
    merge(arena, player);     //adding the piece in the arena
    playerReset();
    arenaSweep();
    updateScore();
  }
  dropCounter = 0;
}

function playerMove(offset) {
  player.position.x += offset;
  if (collide(arena, player)) {
    player.position.x -= offset;
  }
}

function playerReset() {
  var pieces = 'TJLOSZI';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  //inserts a random piece matrix into the player object
  player.position.y = 0;
  //positions the piece at y = 0 (top of the game window)
  player.position.x = (arena[0].length / 2 | 0) -
                      (player.matrix[0].length / 2 | 0);
  //positions the piece in the middle of the arena

  if (collide(arena, player)) {
    arena.forEach( function (row) {
      console.log('HELLO');
      return row.fill(0);
      //Resets the arena to be filled with zeroes
      //because a new piece won't fit in the arena
    });

    player.score = 0;
    //reset
    updateScore();
  }
}

function playerRotate(direction) {
  var position = player.position.x;
  var offset = 1;
  rotate(player.matrix, direction);
  while (collide(arena, player)) {
    player.position.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));

    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -direction);
      player.position.x = position;
      return;
    }
  }
}

var dropCounter = 0;
var dropInterval = 1000;

var lastTime = 0;
function update(time = 0) {
  var deltaTime = time - lastTime;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  lastTime = time;

  draw();
  requestAnimationFrame(update);
}

function updateScore() {
  document.getElementById('score').innerText = player.score;
}

document.addEventListener('keydown', function (event) {
  //left arrow key
  if (event.keyCode === 37) {
    playerMove(-1);
  }
  //right arrow key
  else if (event.keyCode === 39) {
    playerMove(1);
  }
  //down arrow key
  else if (event.keyCode === 40) {
    playerDrop();
  }
  //up arrow key
  else if (event.keyCode === 38) {
    playerRotate(1);
  }
});

var colors = [
  null,
  '#FF0D72',
  '#0DC2FF',
  '#0DFF72',
  '#F538FF',
  '#FF8E0D',
  '#FFE138',
  '#3877FF',
];

var arena = createMatrix(12, 20);
//From the createMatrix function, a new array filled with
//12 zeroes will be pushed 20 times
//resulting in a 2D array

var player = {
  position: {x: 0, y: 0},
  matrix: null,
  score: 0,
};
