"use strict";

// 1. write a js function to display the current day and time
//
// do this using js Date obj
// This returns current datetime in UTC (not local timezone)
const currentDayAndTime=()=> new Date();

console.log(currentDayAndTime());

console.log(); // blank line separator

// 2. write a js function to convert a number -> string
//
// check that argument given is Number type
// if Number type, convert using the toString method
// if NOT Number type, return an error string notifying argument given is not Number type

const convertNumToStr=(arg1)=>{
  // check that arg1 is Number type first
  if (typeof arg1 === "number") {
    return arg1.toString();
  } else {
    return "Argument provided is not a Number type";
  }
};

console.log(convertNumToStr(217));
// check typeof value returned by convertNumToStr
console.log(typeof convertNumToStr(217));
// try passing an argument that is NOT a Number type
console.log(convertNumToStr('217'));

console.log(); // blank line separator

// 3. write a js function to convert a string -> number
//
// check that argument given is string type
// if string type, convert using the parseInt method
// if NOT string type, return an error string notifying the argument given is not string type

const convertStrToNum=(arg1)=>{
  // check that arg1 is string type first
  if (typeof arg1 === "string") {
    // note: the 2nd arg provided to parseInt is the base (base 10, octal, hexadecimal, etc)
    return parseInt(arg1, 10);
  } else {
    return "Argument provided is not a String type";
  }
};

console.log(convertStrToNum("93"));
// check typeof value returned by convertStrToNum
console.log(typeof convertStrToNum("93"));
// try passing an argument that is NOT a string type
console.log(convertStrToNum(93));

console.log(); // blank line separator

// 4. write a js function that takes in different datatypes and prints out the datatype of the arg
//
// I was going to make this a oneline function that returns the typeof the arg passed to it
// however, typeof null = object and typeof NaN = number
// so I will expand the function to be more explicit in it's output
//
// first check the data types that are truthy
// second check the data types that are falsy
//  - this is bc some truthy types when checked will return falsy in functions like isNaN
//  - ex: isNaN("this is a string") will return true, so should be placed AFTER the string check

// const checkDataType=(arg1)=>{
//   // begin checking TRUTHY data types
//   // check for Boolean type
//   if (typeof arg1 === "boolean") {
//     console.log(arg1 + " is type Boolean");
//   }
//   // check for Number type
//   // we need to check both typeof arg1 && isNaN(arg1) === "false" bc typeof NaN === "number"
//   else if (typeof arg1 === "number" && isNaN(arg1) === false) {
//     console.log(arg1 + " is type Number");
//   }
//   // check for String type
//   else if (typeof arg1 === "string") {
//     console.log(arg1 + " is type String");
//   }
//   // begin checking FALSY data types
//   // check for null type
//   else if (arg1 === null) {
//     console.log(arg1 + " is type Null");
//   }
//   // check for Undefinded type
//   else if (arg1 === undefined) {
//     console.log(arg1 + " is type Undefined");
//   }
//   // check for NaN type using isNaN method
//   else if (isNaN(arg1)) {
//     console.log(arg1 + " is type NaN");
//   }
// };

const checkDataType = (arg1) => typeof arg1;

// check Boolean type
console.log(checkDataType(true));
// check Null type
console.log(checkDataType(null));
// check Undefinded type
console.log(checkDataType(undefined));
// check Number type
console.log(checkDataType(31));
// check NaN type
// parseInt("string not a number") will return a value of NaN
console.log(checkDataType(parseInt("string not a number")));
// check String type
console.log(checkDataType("Howdydoodee"));

console.log(); // blank line separator

// 5. write a js function that adds two numbers together
//
// oneline function that returns the addition of two arguments

const addTwoNumbers=(arg1, arg2)=> arg1 + arg2;

console.log(addTwoNumbers(20, 40));

console.log(); // blank line separator

// 6. write a js function that runs only when 2 'things' (args) are true
//
// the wording of the problem says runs only when 2 things are "true" and not "truthy"
// so I assume the expected arguments are boolean type
//
// check both args given to see if they === true, if so, print message
// if 1 or more args !== true, do nothing

const twoArgsTrue=(arg1, arg2)=>{
  if (arg1 && arg2) {
    console.log("Both args are true");
  }
};
// this should print a message
twoArgsTrue(true, true);
// this should not print a message
twoArgsTrue(true, false);

console.log(); // blank line separator

// 7. write a js function that runs when 1 of 2 things are true
//
// the wording of the problem says runs only when 1 of 2 things are "true" and not "truthy"
// so I assume the expected arguments are boolean type
//
// check both args, if 1 arg === true && 1 arg === false, then print message
// any other case, do not run

const oneTrueOneFalse=(arg1, arg2)=>{
  if (arg1 && !arg2) {
    console.log("arg1 is True, arg2 is False");
  } else if (!arg1 && arg2) {
    console.log("arg1 is False, arg2 is True");
  }
};
// these should print a message
oneTrueOneFalse(true, false);
oneTrueOneFalse(false, true);
// this should NOT print a message
oneTrueOneFalse(true, true);

console.log(); // blank line separator

// 8. write a js function that runs when both 'things' (args) are not true
//
// the wording of the problem says runs only when both things are "false" and not "falsy"
// so I assume the expected arguments are boolean type
//
// check both args given to see if === false, if so, print message
// any other case, do not print message

const twoArgsFalse=(arg1, arg2)=>{
  if (!arg1 && !arg2) {
    console.log("both arg1 and arg2 are false");
  }
};
// this should print a message
twoArgsFalse(false, false);
// this should NOT print a message
twoArgsFalse(true, false);
