'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// function to sanitize user input
// returns a lower case, trimmed string
function sanitizeInput(input) {
  return input.toLowerCase().trim();
}

// validates user input
// returns true/false
// TRUE: if input is: a, b, c
// FALSE: otherwise
function validateInput(startStack, endStack) {
  const start = sanitizeInput(startStack);
  const end = sanitizeInput(endStack);

  return ((start === 'a' || start === 'b' || start === 'c') && (end === 'a' || end === 'b' || end === 'c'));
}

// prints the current stacks object
function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// moves a piece from one stack to the other
// will only move piece if the move isLegal
// does not return anything
function movePiece(startStack, endStack) {
  // sanitize user input
  const start = sanitizeInput(startStack);
  const end = sanitizeInput(endStack);

  // if is a legal move, then move piece
  if ( isLegal(start, end) ) {
    const piece = stacks[start].pop();
    stacks[end].push(piece);
  }
}

// determines whether a move is legal or not
// returns true/false
// TRUE: if stack is empty OR if current piece on endstack is greater size than piece being moved
// FALSE: if piece being moved is greater than piece on endstack
function isLegal(startStack, endStack) {
  // Sanitize user input
  const start = sanitizeInput(startStack);
  const end = sanitizeInput(endStack);

  // get the lengths of the start and end arrays
  const startLen = stacks[start].length;
  const endLen = stacks[end].length;

  // if stack is empty, then good to move piece
  if (endLen === 0) {
    return true;
  } else {
    // if current piece on endstack is greater size than piece being moved
    return (stacks[end][endLen - 1] > stacks[start][startLen - 1]);
  }
}

// checks for win
// win = pieces placed largest -> smallest on either b or c stack
// returns true/false
function checkForWin() {
  return ((stacks.c[0] === 4 && stacks.c[1] === 3 && stacks.c[2] === 2 && stacks.c[3] === 1) || (stacks.b[0] === 4 && stacks.b[1] === 3 && stacks.b[2] === 2 && stacks.b[3] === 1));
}

// win banner to display once a user wins
function winBanner() {
  console.log("\n========================");
  console.log("WIN!!!");
  console.log("========================\n");
}

// resets the global vars (and therefor the game)
function resetGame() {
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  };
}

/*
  WHITEBOARD

  [x] sanitize input
  [x] validate move - isLegal()
  [x] IF: legal move, then movePiece()
  [x] ELSE: console log illegal move


 */

// main function
function towersOfHanoi(startStack, endStack) {
  const start = sanitizeInput(startStack);
  const end = sanitizeInput(endStack);

  // if user input is valid
  if ( validateInput(start, end) ) {
    // if stack move is a legal move
    if ( isLegal(start, end) ) {
      movePiece(start, end);

      // if user wins after movePiece(), show win banner and reset game
      if ( checkForWin() ) {
        winBanner();
        resetGame();
      }
    } // else, illegal move
    else {
      console.log("\nIllegal move\n");
    }
  } // else, not valid input: NOT a, b, c
  else {
    console.log("\nInvalid input\n");
  }
}

function getPrompt() {
  console.log("--------------------");
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });
  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
  // user written tests
  describe('#validateInput()', () => {
    it('should only accept: a, b, c as input', () => {
      assert.equal(validateInput('A', 'b'), true);
      assert.equal(validateInput('d', 'x'), false);
    });
  });

  describe('#resetGame()', () => {
    it('should reset the board to initial state', () => {
      stacks = { a: [1], b: [4, 3], c: [2] };
      resetGame();
      assert.deepEqual(stacks, { a: [4, 3, 2, 1], b: [], c: [] });
    });
  });

} else {

  getPrompt();

}
