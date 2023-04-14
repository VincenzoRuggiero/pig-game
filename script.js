"use strict";

// Selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Storing current score
let currentScore = 0;

// Storing total scores
const scores = [0, 0];

// Set active player
let activePlayer = 0;

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
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
    activePlayer = activePlayer === 0 ? 1 : 0;
  }
});
