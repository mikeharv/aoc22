const fs = require("fs");

const lines = fs
  .readFileSync("day02.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => x.split(' '));

guideResults(lines);
function guideResults(input) {
  let score = 0;
  for ( var i=0; i<input.length; i++) {
    switch (input[i][0]) {
      case 'A': // Rock
        switch (input[i][1]) {
          case 'X': // Lose
            score += 3;
            break;
          case 'Y': // Draw
            score += 4;
            break;
          case 'Z': // Win
            score += 8;
            break;
        }
        break;
      case 'B': // Paper
      switch (input[i][1]) {
        case 'X': // Lose
          score += 1;
          break;
        case 'Y': // Draw
          score += 5;
          break;
        case 'Z': // Win
          score += 9;
          break;
      }
        break;
      case 'C': // Scissors
      switch (input[i][1]) {
        case 'X': // Lose
          score += 2;
          break;
        case 'Y': // Draw
          score += 6;
          break;
        case 'Z': // Win
          score += 7;
          break;
      }
        break;
    }
  }
  console.log(score);
}