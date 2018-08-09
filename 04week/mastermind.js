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

// checks for win
// returns true/false
function checkForWin(guess) {
  return (guess === solution);
}

// win banner to display when user wins
function winBanner() {
  console.log("\n===============".green);
  console.log("YOU WIN!!!".green);
  console.log("===============\n".green);
}

// lose banner to display when user loses
function loseBanner() {
  console.log("\n===============".red);
  console.log("YOU LOSE...  :(".red);
  console.log("===============\n".red);
}

// resets game/global vars
function resetGame() {
  board = [];
  solution = 'abcd';
  letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  turns = 0;
}

// check to make sure input is correct length (4 chars) and are letters a-h
// returns true/false
function isValidInput(input) {
  const inptCln = sanitizeInput(input);
  // create arr of chars from input
  const inptArr = inptCln.split('');
  // return value
  let isValid = false;

  // check to make sure input is correct length
  if (inptArr.length === 4) {
    // iterate over each char in input, and make sure it's
    for (let i = 0; i < inptArr.length; i++) {
      // if current char is not a-h, break out of loop and return false
      if (!letters.includes(inptArr[i])) {
        isValid = false;
        break;
      } else {
        isValid = true;
      }
    }
  }

  return isValid;
}

// converts input to lower case and trims whitespace
// returns string
function sanitizeInput(input) {
  return input.toLowerCase().trim();
}

// prints board (all guesses) and the current # of turn
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

// generates a string hint based on user guess
// string is formatted "0-0" -> "${correctLetterAndLocation}-${correctLetterWrongLocation}"
// returns string hint
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

  return `${correctLetterLocations}`.red + `-${correctLetters}`;
}

// main function
function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution

  const guessCln = sanitizeInput(guess);

  // check to make sure input is 4 chars long & letters a-h
  if ( isValidInput(guessCln) ) {
    // generate hint and push it to the board
    const hintStr = generateHint(guessCln) + " | " + guessCln;
    board.push(hintStr);

    // if win, show win banner & reset game
    if ( checkForWin(guessCln) ) {
      // show win banner and reset game
      winBanner();
      resetGame();
    } else if (turns === 10) {
      // user lost, show lose banner and reset game
      loseBanner();
      resetGame();
    } else {
      // increase # of turns. Is global var
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
