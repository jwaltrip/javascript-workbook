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
  [x] 4. If (User1 AND User2 input is 'rock') OR (User1 AND User2 input is 'paper') OR (User1 AND User2 input is 'scissors'), it's a tie
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

    // code to test who wins goes here

    // If (User1 AND User2 input is 'rock') OR (User1 AND User2 input is 'paper') OR (User1 AND User2 input is 'scissors'), it's a tie
    if((hand1LowerTrim == "rock" && hand2LowerTrim == "rock") || (hand1LowerTrim == "paper" && hand2LowerTrim == "paper") || (hand1LowerTrim == "scissors" && hand2LowerTrim == "scissors")) {
      return "It's a tie!";
    }
    // If User1 input is 'rock' AND User2 input is 'scissors', User1 wins
    else if (hand1LowerTrim == "rock" && hand2LowerTrim == "scissors") {
      return "Hand one wins!";
    }
    // If User1 input is 'rock' AND User2 input is 'paper', User2 wins
    else if (hand1LowerTrim == "rock" && hand2LowerTrim == "paper") {
      return "Hand two wins!";
    }
    // If User1 input is 'paper' AND User2 input is 'rock', User1 wins
    else if (hand1LowerTrim == "paper" && hand2LowerTrim == "rock") {
      return "Hand one wins!";
    }
    // If User1 input is 'paper' AND User2 input is 'scissors', User2 wins
    else if (hand1LowerTrim == "paper" && hand2LowerTrim == "scissors") {
      return "Hand two wins!";
    }
    // If User1 input is 'scissors' AND User2 input is 'paper', User1 wins
    else if (hand1LowerTrim == "scissors" && hand2LowerTrim == "paper") {
      return "Hand one wins!";
    }
    // If User1 input is 'scissors' AND User2 input is 'rock', User2 wins
    else if (hand1LowerTrim == "scissors" && hand2LowerTrim == "rock") {
      return "Hand two wins!";
    }

  }
  // if hand1 and/or hand2 do NOT have correct inputs
  else {

    // if both hand1 and hand2 is NOT 'rock', 'paper', or 'scissors', print error message
    if (isHand1Correct == false && isHand2Correct == false) {
      return 'ERROR: both Hand1 and Hand2 did not enter correct value of: "rock", "paper", or "scissors" (case in-sensitive)';
    }

    // if only hand1 is NOT 'rock', 'paper', or 'scissors', print error message
    if (isHand1Correct == false) {
      return 'ERROR: Hand1 did not enter correct value of: "rock", "paper", or "scissors" (case in-sensitive)';
    }

    // if only hand2 is NOT 'rock', 'paper', or 'scissors', print error message
    if (isHand2Correct == false) {
      return 'ERROR: Hand2 did not enter correct value of: "rock", "paper", or "scissors" (case in-sensitive)';
    }

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
//
// For unit tests, I installed Mocha globally using NPM (npm install -g mocha)
// Ran in terminal: mocha rockPaperScissors.js
// all tests came back proper! :)

if (typeof describe === 'function') {

  describe('rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
