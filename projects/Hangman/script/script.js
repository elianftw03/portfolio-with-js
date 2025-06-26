const words = ["javascript", "developer", "hangman", "frontend", "backend"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let wrongLetters = [];
let maxAttempts = 6;

function displayWord() {
  document.querySelector(".word").innerText = selectedWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function guessLetter() {
  let input = document.getElementById("letterInput").value.toLowerCase();
  if (!input || guessedLetters.includes(input) || wrongLetters.includes(input))
    return;

  if (selectedWord.includes(input)) {
    guessedLetters.push(input);
  } else {
    wrongLetters.push(input);
    maxAttempts--;
    showHangmanPart();
  }

  document.querySelector(".wrong-letters").innerText = wrongLetters.join(", ");
  document.querySelector(".attempts").innerText = maxAttempts;

  checkGameStatus();
  displayWord();
  document.getElementById("letterInput").value = "";
}

function showHangmanPart() {
  let parts = document.querySelectorAll(".part");
  let index = 6 - maxAttempts;
  if (index >= 0 && index < parts.length) {
    parts[index].style.display = "block";
  }
}

function checkGameStatus() {
  if (!document.querySelector(".word").innerText.includes("_")) {
    document.querySelector(".message").innerText = "🎉 You Won!";
    document.querySelector("button").classList.remove("hidden");
  } else if (maxAttempts <= 0) {
    document.querySelector(
      ".message"
    ).innerText = `💀 You Lost! The word was "${selectedWord}"`;
    document.querySelector("button").classList.remove("hidden");
  }
}

function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongLetters = [];
  maxAttempts = 6;
  document.querySelector(".wrong-letters").innerText = "";
  document.querySelector(".attempts").innerText = maxAttempts;
  document.querySelector(".message").innerText = "";
  document.querySelector("button").classList.add("hidden");

  document
    .querySelectorAll(".part")
    .forEach((part) => (part.style.display = "none"));

  displayWord();
}

displayWord();
