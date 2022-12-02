const fs = require("fs");

const lines = fs
  .readFileSync("day01.txt", { encoding: "utf-8" })
  .split("\n")
  //.filter((x) => Boolean(x))
  .map((x) => parseInt(x));

countCalorieGroups(lines);

function countCalorieGroups(input) {
    let totals = [0];
    let elfId = 0;
    for (let i=0; i<input.length; i++) {
        if(isNaN(input[i])) {
            elfId++;
            totals[elfId] = 0;
        } else {
            totals[elfId] += input[i];
        }
    }
    totals.sort(function(a, b) {
        return b - a;
      });
    console.log('Part 1:', Math.max(...totals));
    console.log('Part 2:', totals[0] + totals[1] + totals[2]);
}