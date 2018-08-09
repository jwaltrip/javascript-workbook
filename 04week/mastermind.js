'use strict';

const colors = require('colors');
const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// global vars
let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function sanitizeInput(input) {
  return input.toLowerCase().trim();
}

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

// randomly generates 4 char solution
// does not return anything
// works on global vars
function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

// generates/returns random int between input @min - @max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess) {
  // create char array from solution and guess
  const guessArr = guess.split('');
  const solutionArr = solution.split('');

  let correctLetterLocations = 0;

  // iterate over solution, and find how many letters in guess are in correct location
  solutionArr.forEach((letter, i) => {
    if (letter === guessArr[i]) {
      correctLetterLocations++;
      letter = null;
    }
  });

  let correctLetters = 0;

  // iterate over solution, and find how many letters are correct but in the WRONG location
  solutionArr.forEach((letter, i) => {
    let targetIndex = guessArr.indexOf(i);

    // if current letter in solutionsArr is found anywhere in the guessArr (if correct letter, but wrong location)
    if (targetIndex > -1) {
      correctLetters++;
      letter = null;
    }
  });

  const hintString = `${correctLetterLocations}`.red + `-${correctLetters}`;

  return hintString;

}

function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution

  const guessCln = sanitizeInput(guess);


}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
