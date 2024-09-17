#!/usr/bin/env node

const process = require("node:process");
function printHelpMessage() {
  console.log(`
        Usage: password-generator [options]
        
        Options:
        --length <number>   Specify the length of the password (default: 8)
        --numbers           Include numbers in the password
        --uppercase         Include uppercase letters in the password
        --symbols           Include symbols in the password
        --help              Show this help message`);
}

// Default values
let length = 8;
let hasNumbers = false;
let hasUppercase = false;
let hasSymbols = false;

const args = process.argv.slice(2);

// Parse arguments

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "--help":
      printHelpMessage();
      process.exit(0);

    case "--length":
      const nextArg = args[i + 1];
      if (nextArg && !isNaN(nextArg)) {
        length = parseInt(nextArg);
        i++;
      } else {
        console.error("Please provide a valid number for --length");
        process.exit(1);
      }
      break;

    case "--numbers":
      hasNumbers = true;
      break;

    case "--uppercase":
      hasUppercase = true;
      break;

    case "--symbols":
      hasSymbols = true;
      break;

    default:
      console.error(`Unknown option: ${args[i]}`);
      printHelpMessage();
      process.exit(1);
  }
}

// Character sets
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

// Build the character pool
let charPool = lowercase;
if (hasNumbers) charPool += numbers;
if (hasUppercase) charPool += uppercase;
if (hasSymbols) charPool += symbols;

// Function to generate a password
function generatePassword(length) {
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }
  return password;
}

// Generate and print the password
const password = generatePassword(length);
console.log(`Generated password: ${password}`);
