let board = Array(9).fill(null);
let currentPlayer = "X";
let round = 0;
let isGameActive = true;
let xWins = 0;
let oWins = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll(".cell");
const statusElement = document.getElementById("status");
const xWinsElement = document.getElementById("xWins");
const oWinsElement = document.getElementById("oWins");

function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");

  if (!isGameActive || board[index] !== null) return; // Prevent overriding

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();
  switchPlayer();
}

function switchPlayer() {
  if (isGameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusElement.textContent = `Player ${board[a]} Wins!`;
      isGameActive = false;
      updateScore(board[a]);
      return;
    }
  }

  if (round === 8) {
    statusElement.textContent = "It's a Draw!";
    isGameActive = false;
  }

  round++;
}

function updateScore(winner) {
  if (winner === "X") {
    xWins++;
    xWinsElement.textContent = `X Wins: ${xWins}`;
  } else {
    oWins++;
    oWinsElement.textContent = `O Wins: ${oWins}`;
  }
}

function resetGame() {
  board = Array(9).fill(null);
  round = 0;
  isGameActive = true;
  currentPlayer = "X";

  cells.forEach((cell) => {
    cell.textContent = "";
  });

  statusElement.textContent = "Player X's turn";
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});
