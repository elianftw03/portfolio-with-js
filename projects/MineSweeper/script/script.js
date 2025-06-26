const size = 10,
  mineCount = 15;
let board = [],
  mines = [],
  gameOver = false;

function createBoard() {
  document.getElementById("board").innerHTML = "";
  board = [];
  mines = [];
  gameOver = false;
  document.getElementById("message").innerText = "";

  for (let r = 0; r < size; r++) {
    board[r] = [];
    for (let c = 0; c < size; c++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.addEventListener("click", revealCell);
      cell.addEventListener("contextmenu", markFlag);
      document.getElementById("board").appendChild(cell);
      board[r][c] = {
        mine: false,
        revealed: false,
        flagged: false,
        el: cell,
      };
    }
  }
  placeMines();
}

function placeMines() {
  let placed = 0;
  while (placed < mineCount) {
    let r = Math.floor(Math.random() * size);
    let c = Math.floor(Math.random() * size);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      mines.push([r, c]);
      placed++;
    }
  }
}

function revealCell(e) {
  if (gameOver) return;
  let r = +e.target.dataset.r;
  let c = +e.target.dataset.c;
  if (board[r][c].revealed || board[r][c].flagged) return;

  board[r][c].revealed = true;
  board[r][c].el.classList.add("revealed");

  if (board[r][c].mine) {
    board[r][c].el.classList.add("mine");
    endGame(false);
    return;
  }

  let minesAround = countMines(r, c);
  if (minesAround > 0) {
    board[r][c].el.innerText = minesAround;
  } else {
    revealAdjacent(r, c);
  }
  checkWin();
}

function markFlag(e) {
  e.preventDefault();
  if (gameOver) return;
  let r = +e.target.dataset.r;
  let c = +e.target.dataset.c;
  let cell = board[r][c];

  if (cell.revealed) return;

  if (cell.flagged) {
    cell.flagged = false;
    cell.el.classList.remove("flag");
    cell.el.innerText = "";
  } else {
    cell.flagged = true;
    cell.el.classList.add("flag");
    cell.el.innerText = "🚩";
  }
}

function countMines(r, c) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      let nr = r + dr,
        nc = c + dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size && board[nr][nc].mine) {
        count++;
      }
    }
  }
  return count;
}

function revealAdjacent(r, c) {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      let nr = r + dr,
        nc = c + dc;
      if (
        nr >= 0 &&
        nr < size &&
        nc >= 0 &&
        nc < size &&
        !board[nr][nc].revealed
      ) {
        revealCell({ target: board[nr][nc].el });
      }
    }
  }
}

function checkWin() {
  let revealedCount = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c].revealed) revealedCount++;
    }
  }
  if (revealedCount + mineCount === size * size) {
    endGame(true);
  }
}

function endGame(win) {
  gameOver = true;
  document.getElementById("message").innerText = win
    ? "🎉 You Won!"
    : "💥 Game Over!";
  mines.forEach(([r, c]) => board[r][c].el.classList.add("mine"));
}

function resetGame() {
  createBoard();
}

createBoard();
