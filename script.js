"use strict";

// Selecting elements
const player1Name = document.getElementById("name--0");
const player2Name = document.getElementById("name--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
let score0El = document.getElementById("score--0"); // Player 1 total score
let score1El = document.getElementById("score--1"); // Player 2 total score
let current0El = document.getElementById("current--0"); // Player 1 current score
let current1El = document.getElementById("current--1"); // Player 2 current score
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let currentScore, scores, activePlayer, playing;

// Reset values
const init = function () {
  // Starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  // Storing current score
  currentScore = 0;

  // Storing total scores
  scores = [0, 0]; // Position 0 for Player 1, Position 1 for Player 2

  // Player handling (Player 1 always first on New Game)
  activePlayer = 0;

  // Set if game is running or not
  playing = true;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating random dice-roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add the dice value to the score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Holding current points functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch the next player
      switchPlayer();
    }
  }
});

// 'New Game' button functionality
btnNew.addEventListener("click", init);
