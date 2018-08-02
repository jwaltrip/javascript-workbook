'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

// global var to hold which player won
let whichPlayerWin = null;

// toggles current player turn
function switchPlayer() {
  if (playerTurn === 'X') {
    playerTurn = 'O';
  } else {
    playerTurn = 'X';
  }
}

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

// checks for horizontal win
// returns true/false
// if true, sets global whichPlayerWin var
function horizontalWin() {
  // value to be returned
  let isWin = false;

  // iterate over each row in board
  board.forEach((row) => {
    // if player X won
    if (row[0] === 'X' && row[1] === 'X' && row[2] === 'X') {
      isWin = true;
      whichPlayerWin = 'X'; // set which player won
    } // if player O won
    else if (row[0] === 'O' && row[1] === 'O' && row[2] === 'O') {
      isWin = true;
      whichPlayerWin = 'O'; // set which player won
    }
  });

  return isWin;
}

// checks for vertical win
// returns true/false
// if true, sets global whichPlayerWin var
function verticalWin() {
  // value to be returned
  let isWin = false;

  // iterate over each col in board
  // wasnt sure how to do this in a forEach loop
  for (let i = 0; i <= 2; i++) {
    // if player X won
    if (board[0][i] === 'X' && board[1][i] === 'X' && board[2][i] === 'X') {
      isWin = true;
      whichPlayerWin = 'X'; // set which player won
      break;
    } // if player O won
    else if (board[0][i] === 'O' && board[1][i] === 'O' && board[2][i] === 'O') {
      isWin = true;
      whichPlayerWin = 'O'; // set which player won
      break;
    }
  }

  return isWin;
}

// checks for diagonal win
// returns true/false
// if true, sets global whichPlayerWin var
function diagonalWin() {
  // value to be returned
  let isWin = false;

  // if player X has diagonal win (both directions)
  if ((board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') || (board[0][2] === 'X' && board[1][1] === 'X' && board[2][0] === 'X')) {
    isWin = true;
    whichPlayerWin = 'X'; // set which player won
  } // if player O has diagonal win (both directions)
  else if ((board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O') || (board[0][2] === 'O' && board[1][1] === 'O' && board[2][0] === 'O')) {
    isWin = true;
    whichPlayerWin = 'O'; // set which player won
  }

  return isWin;
}

// checks for: horizontal, vertical, or diagonal win
// returns true/false
function checkForWin() {
  return horizontalWin() || verticalWin() || diagonalWin();
}

// checks to make sure user input is valid
// returns true/false
function isValidInput(row, col) {
  return ((row >= 0 && row <= 2) && (col >= 0 && col <= 2));
}

// updates the board with user input
// returns true/false
// true: if location is not occupied, updates board
// false: if location is empty, does not update board
function updateBoard(row, col) {
  // check if location user chose is empty
  if (board[row][col] === ' ') {
    board[row][col] = playerTurn;
    return true;
  } // if location user chose is occupied
  else {
    return false;
  }
}

// resets the board and player after a win
// sets the global vars back to their original values
function resetBoard() {
  board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  playerTurn = 'X';
  whichPlayerWin = null;
}

// banner to display when a player wins
function winBanner() {
  // console.log(`\n------------------------`);
  console.log(`\n========================`);
  console.log(`Player ${whichPlayerWin} wins!\n`);
  printBoard();
  console.log(`\nResetting the board`);
  // console.log(`------------------------\n`);
  console.log(`========================\n`);
}

/*
   WHITEBOARD:

   [x] show board
   [x] user input: row, col
   [x] check user input is valid move
   [x] update board w/ user input
   [x] check for win
   [x] IF: win, display board and message saying which user won
   [x] ELSE: no win, toggle active player
 */

function ticTacToe(row, column) {
  // check for valid input
  if ( isValidInput(row, column) ) {

    // update board w/ user input
    // returns true/false if was able to update successfully
    if ( updateBoard(row, column) ) {

      // check for horizontal, vertical, or diagonal WIN
      if ( checkForWin() ) {
        // show win banner/board
        winBanner();
        // reset board
        resetBoard();

      } // no win, continue game
      else {
        // switch player
        switchPlayer();
      }
    } // else cannot place move at location entered
    else {
      console.log("\nError: cannot place move at entered location\n");
    }
  } // else not valid input value
  else {
    console.log("\nError: invalid user input\n");
  }

}

function getPrompt() {
  console.log("------------------------");
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
