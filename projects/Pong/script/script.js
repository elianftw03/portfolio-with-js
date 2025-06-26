const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10,
  paddleHeight = 80;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2,
  ballY = canvas.height / 2;
let ballSpeedX = 4,
  ballSpeedY = 4;
const paddleSpeed = 6;

let playerScore = 0,
  aiScore = 0;
const winningScore = 5;

let upPressed = false,
  downPressed = false;
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") upPressed = true;
  if (event.key === "ArrowDown") downPressed = true;
});
document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") upPressed = false;
  if (event.key === "ArrowDown") downPressed = false;
});

function update() {
  if (upPressed && playerY > 0) playerY -= paddleSpeed;
  if (downPressed && playerY < canvas.height - paddleHeight)
    playerY += paddleSpeed;

  let aiCenter = aiY + paddleHeight / 2;
  if (aiCenter < ballY - 20) aiY += paddleSpeed;
  else if (aiCenter > ballY + 20) aiY -= paddleSpeed;

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= canvas.height) ballSpeedY *= -1;

  if (
    ballX <= paddleWidth &&
    ballY >= playerY &&
    ballY <= playerY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }
  if (
    ballX >= canvas.width - paddleWidth &&
    ballY >= aiY &&
    ballY <= aiY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  if (ballX <= 0) {
    aiScore++;
    resetBall();
  }
  if (ballX >= canvas.width) {
    playerScore++;
    resetBall();
  }

  if (playerScore === winningScore || aiScore === winningScore) {
    alert(`${playerScore === winningScore ? "You Win!" : "AI Wins!"}`);
    playerScore = 0;
    aiScore = 0;
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 4 * (Math.random() > 0.5 ? 1 : -1);
  ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "20px Arial";
  ctx.fillText(`Player: ${playerScore}`, 100, 30);
  ctx.fillText(`AI: ${aiScore}`, canvas.width - 150, 30);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
