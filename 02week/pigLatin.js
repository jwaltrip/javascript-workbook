'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// this will convert user input to all lowercase, and trim any whitespace
// returns a string
function sanitizeInput(userInput) {
  return userInput.toLowerCase().trim();
}

// this function finds and returns the index of the first vowel in user input
// will return -1 if no vowels are found
function findFirstVowel(userInput) {
  // trim input of whitespace and convert to lowercase
  const sanitizedInput = sanitizeInput(userInput);
  // convert input string into array of chars
  const inputArr = sanitizedInput.split('');
  // return variable. will contain index of first vowel found
  let vowelIndex = -1;

  // loop over user input array of chars
  for (let i = 0; i < inputArr.length; i++) {
    // check to see if current char is a vowel
    // if so, set vowelIndex and break out of loop
    if (inputArr[i] === 'a' || inputArr[i] === 'e' || inputArr[i] === 'i' || inputArr[i] === 'o' || inputArr[i] === 'u') {
      vowelIndex = i;
      break; // break out of the loop since we found the first vowel
    }
  }

  return vowelIndex;
}

// Whiteboarding

/*  FUNCTIONS  */

// create a function to sanitize user input by using toLowerCase() and trim() functions on user input named sanitizeInput(userInput), returns sanitized user input
// create a function that scans user input and returns index of first vowel named findFirstVowel(userInput)

/*  FLOW  */

// [x] 1. sanitize user input using sanitizeInput(userInput) function
// [x] 2. get index of first vowel in input using findFirstVowel(userInput) function
// [x] 3. if: first letter is a vowel, then add 'yay' to end of word and return value
// [x] 4. else if: no vowels were found in input, return a message saying "no vowels were found in: " + input
// [x] 5. use substring() method to get first part of string up to first vowel
// [x] 6. use substring() method to get second part of string, starting with first vowel to end of string
// [x] 7. format and return pig latin string like: secondPart + firstPart + 'ay'

function pigLatin(word) {

  // trim input of any whitespace and convert to lowercase
  const sanitizedInput = sanitizeInput(word);
  // find the index of the first vowel found
  const firstVowelIdx = findFirstVowel(sanitizedInput);

  // if first char is a vowel, add 'yay' to end of input string and return
  if (firstVowelIdx === 0) {
    return sanitizedInput + 'yay';
  }
  // if no vowels were found
  else if (firstVowelIdx === -1) {
    return 'No vowels found in: ' + sanitizedInput;
  }

  // get first part of string up to the first vowel
  const firstPart = sanitizedInput.substring(0, firstVowelIdx);
  // gets second part of string starting at first vowel to end of string
  const secondPart = sanitizedInput.substring(firstVowelIdx);

  // return pig latin
  return secondPart + firstPart + 'ay';
}


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}