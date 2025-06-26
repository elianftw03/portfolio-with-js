let blockSize = 25;
let totalRow = 17;
let totalCol = 17;
let board, context;
let snakeX = blockSize * 5,
  snakeY = blockSize * 5;
let speedX = 0,
  speedY = 0;
let snakeBody = [];
let foodX, foodY;
let gameOver = false;
let score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = totalRow * blockSize;
  board.width = totalCol * blockSize;
  context = board.getContext("2d");

  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("restart").addEventListener("click", resetGame);
  placeFood();
  document.addEventListener("keydown", changeDirection);
  setInterval(update, 100);
};

function update() {
  if (gameOver) return;

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  drawGrid();

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
    score += 10;
    document.getElementById("score").innerText = `Score: ${score}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = [...snakeBody[i - 1]];
  }

  if (snakeBody.length) snakeBody[0] = [snakeX, snakeY];

  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;

  context.fillStyle = "lime";
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX >= totalCol * blockSize ||
    snakeY < 0 ||
    snakeY >= totalRow * blockSize
  ) {
    endGame();
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      endGame();
    }
  }
}

function changeDirection(e) {
  if (e.code === "ArrowUp" && speedY === 0) {
    speedX = 0;
    speedY = -1;
  } else if (e.code === "ArrowDown" && speedY === 0) {
    speedX = 0;
    speedY = 1;
  } else if (e.code === "ArrowLeft" && speedX === 0) {
    speedX = -1;
    speedY = 0;
  } else if (e.code === "ArrowRight" && speedX === 0) {
    speedX = 1;
    speedY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * totalCol) * blockSize;
  foodY = Math.floor(Math.random() * totalRow) * blockSize;
}

function endGame() {
  gameOver = true;
  document.getElementById("status").innerText = "Game Over! Press Restart";
  document.getElementById("restart").style.display = "block";
}

function resetGame() {
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  speedX = 0;
  speedY = 0;
  snakeBody = [];
  gameOver = false;
  score = 0;
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("status").innerText = "";
  document.getElementById("restart").style.display = "none";
  placeFood();
}

function drawGrid() {
  context.strokeStyle = "gray";
  for (let i = 0; i < totalCol; i++) {
    context.beginPath();
    context.moveTo(i * blockSize, 0);
    context.lineTo(i * blockSize, board.height);
    context.stroke();
  }
  for (let i = 0; i < totalRow; i++) {
    context.beginPath();
    context.moveTo(0, i * blockSize);
    context.lineTo(board.width, i * blockSize);
    context.stroke();
  }
}
