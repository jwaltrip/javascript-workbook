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

// let stacks = {
//   a: [1],
//   b: [],
//   c: [4, 3, 2]
// };

function sanitizeInput(input) {
  return input.toLowerCase().trim();
}

function validateInput(startStack, endStack) {
  const start = sanitizeInput(startStack);
  const end = sanitizeInput(endStack);

  return ((start === 'a' || start === 'b' || start === 'c') && (end === 'a' || end === 'b' || end === 'c'));
}

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  // Your code here
  const start = sanitizeInput(startStack);
  const end = sanitizeInput(endStack);

  if ( isLegal(start, end) ) {
    const piece = stacks[start].pop();
    stacks[end].push(piece);
  }
}

function isLegal(startStack, endStack) {
  // Your code here
  const start = sanitizeInput(startStack);
  const end = sanitizeInput(endStack);

  const startLen = stacks[start].length;
  const endLen = stacks[end].length;

  if (endLen === 0) {
    return true;
  } else {
    return (stacks[end][endLen - 1] > stacks[start][startLen - 1]);
  }
}

function checkForWin() {
  return ((stacks.c[0] === 4 && stacks.c[1] === 3 && stacks.c[2] === 2 && stacks.c[3] === 1) || (stacks.b[0] === 4 && stacks.b[1] === 3 && stacks.b[2] === 2 && stacks.b[3] === 1));
}

function winBanner() {
  console.log("\n========================");
  console.log("WIN!!!");
  console.log("========================\n");
}

function resetGame() {
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  };
}

/*
  WHITEBOARD

  [] sanitize input
  [] validate move - isLegal()
  [] IF: legal move, then movePiece()
  [] ELSE: console log illegal move


 */

function towersOfHanoi(startStack, endStack) {
  // Your code here

  const start = sanitizeInput(startStack);
  const end = sanitizeInput(endStack);

  if ( isLegal(start, end) ) {
    movePiece(start, end);

    if ( checkForWin() ) {
      winBanner();
      resetGame();
    }
  } // else, illegal move
  else {
    console.log("\nIllegal move\n");
  }

  // movePiece(startStack, endStack);
  // console.log("is win? = ", checkForWin());
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

} else {

  getPrompt();

}
