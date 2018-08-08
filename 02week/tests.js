'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
  Whiteboarding of Rock, Paper, Scissors game:
  [x] 1. User1 input of: rock, paper, or scissors
  [x] 2. User2 input of: rock, paper, or scissors
  [x] 3. Validate and sanitize user input
  [x] 4. If User1 input === User2 input, it's a tie
  [x] 5. If User1 input is 'rock' AND User2 input is 'scissors', User1 wins (rock beats scissors)
  [x] 6. If User1 input is 'rock' AND User2 input is 'paper', User2 wins (paper beats rock)
  [x] 7. If User1 input is 'paper' AND User2 input is 'rock', User1 wins (paper beats rock)
  [x] 8. If User1 input is 'paper' AND User2 input is 'scissors', User2 wins (scissors beats paper)
  [x] 9. If User1 input is 'scissors' AND User2 input is 'paper', User1 wins (scissors beats paper)
  [x] 10. If User1 input is 'scissors' AND User2 input is 'rock', User2 wins (rock beats scissors)
  [x] 11. Error handling in the event User1 and/or User2 input is incorrect
*/

function rockPaperScissors(hand1, hand2) {

  // First we need to sanitize the user input
  // Use toLowerCase() method to change user input to lowercase so user isn't restricted by being case-sensitive
  // After toLowerCase method, chain on the trim() method to trim whitespace
  const hand1LowerTrim = hand1.toLowerCase().trim();
  const hand2LowerTrim = hand2.toLowerCase().trim();

  // boolean values to hold whether or not hand1 or hand2 is correct (defaults to null, will be set in switch statements for each hand)
  let isHand1Correct = null;
  let isHand2Correct = null;

  // check to see if hand1 has correct inputs
  switch(hand1LowerTrim) {
    case "rock":
    case "paper":
    case "scissors":
      isHand1Correct = true;
      break;
    default:
      isHand1Correct = false;
  }

  // check to see if hand2 has correct inputs
  switch(hand2LowerTrim) {
    case "rock":
    case "paper":
    case "scissors":
      isHand2Correct = true;
      break;
    default:
      isHand2Correct = false;
  }

  // if both hand1 and hand2 have correct inputs
  if (isHand1Correct && isHand2Correct) {
    // Check for tie
    if(hand1LowerTrim === hand2LowerTrim) {
      return "It's a tie!";
    }
    // Check if hand 1 wins
    else if ((hand1LowerTrim === "rock" && hand2LowerTrim === "scissors") || (hand1LowerTrim === "paper" && hand2LowerTrim === "rock") || (hand1LowerTrim === "scissors" && hand2LowerTrim === "paper")) {
      return "Hand one wins!";
    }
    // Check for hand 2 wins
    else if ((hand1LowerTrim === "rock" && hand2LowerTrim === "paper") || (hand1LowerTrim === "paper" && hand2LowerTrim === "scissors") || (hand1LowerTrim === "scissors" && hand2LowerTrim === "rock")) {
      return "Hand two wins!";
    }
  }
  // if hand1 and/or hand2 do NOT have correct inputs
  else {
    // return error message
    return "Error:  Incorrect input";
  }
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      console.log("----------------------");
      getPrompt();
    });
  });
}

// Tests

/* ALL HAND1 WINS */
// rock, scissors
// paper, rock
// scissors, paper

/* ALL HAND2 WINS */
// scissors, rock
// paper, scissors
// rock, paper

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect all hand1 wins', () => {
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
      assert.equal(rockPaperScissors('paper', 'rock'), "Hand one wins!");
      assert.equal(rockPaperScissors('scissors', 'paper'), "Hand one wins!");
    });
    it('should detect all hand2 wins', () => {
      assert.equal(rockPaperScissors('scissors', 'rock'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
    });
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect correct input', () => {
      // test to make sure correct input doesn't give incorrect input error
      assert.notEqual(rockPaperScissors('rock', 'paper'), "Error:  Incorrect input");
      assert.notEqual(rockPaperScissors('paper', 'scissors'), "Error:  Incorrect input");
      // test correct input to see if input is properly sanitized
      assert.equal(rockPaperScissors('SCISSORs ', ' pAper '), "Hand one wins!");
      assert.equal(rockPaperScissors(' RoCK', 'PaPEr '), "Hand two wins!");
    });
  });
} else {

  getPrompt();

}