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
let turns = 1;

function checkForWin(guess) {
  return (guess === solution);
}

function winBanner() {
  console.log("\n===============".green);
  console.log("YOU WIN!!!".green);
  console.log("===============\n".green);
}

function loseBanner() {
  console.log("\n===============".red);
  console.log("YOU LOSE...  :(".red);
  console.log("===============\n".red);
}

function resetGame() {
  board = [];
  solution = 'abcd';
  letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  turns = 0;
}

function isValidInput(input) {
  const inptCln = sanitizeInput(input);
  const inptArr = inptCln.split('');
  let isValid = false;

  if (inptArr.length === 4) {
    inptArr.forEach((char, i) => {
      isValid = letters.includes(char);
    });
  }

  return isValid;
}

function sanitizeInput(input) {
  return input.toLowerCase().trim();
}

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }

  console.log(`Turn ${turns}`.yellow);
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
  solutionArr.forEach((letter, i, arr) => {
    if (letter === guessArr[i]) {
      correctLetterLocations++;
      arr[i] = null;
    }
  });

  let correctLetters = 0;

  // iterate over solution, and find how many letters are correct but in the WRONG location
  solutionArr.forEach((letter, i, arr) => {
    let targetIndex = guessArr.indexOf(letter);

    // if current letter in solutionsArr is found anywhere in the guessArr (if correct letter, but wrong location)
    if (targetIndex > -1) {
      correctLetters++;
      arr[i] = null;
    }
  });

  const hintString = `${correctLetterLocations}`.red + `-${correctLetters}`;

  return hintString;

}

function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution

  const guessCln = sanitizeInput(guess);

  if ( isValidInput(guessCln) ) {
    const hintStr = generateHint(guessCln) + " | " + guessCln;
    board.push(hintStr);

    // if win, show win banner & reset game
    if ( checkForWin(guessCln) ) {
      winBanner();
      resetGame();
    } else if (turns === 10) {
      loseBanner();
      resetGame();
    } else {
      turns++;
    }
  } // else, invalid input
  else {
    console.log("\nError: input characters must be A-H\n".red);
  }


}


function getPrompt() {
  console.log("-----------------");
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
      // assert.equal(mastermind(solution), 'You guessed it!');
      assert.equal(checkForWin('abcd'), true);
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2'.red + '-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1'.red + '-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
