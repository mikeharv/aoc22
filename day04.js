const fs = require("fs");

const lines = fs
  .readFileSync("day04.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => x.split(','))
  .map((x) => [
    (x[0].split('-')).map((y) => parseInt(y)),
    (x[1].split('-')).map((y) => parseInt(y))]);

//console.log(lines);
countFullOverlaps(lines);
countPartialOverlaps(lines);
function countFullOverlaps(input) {
    let overlaps = 0;
    for (let i = 0; i < input.length; i++) {
        if (
            (input[i][0][0] <= input[i][1][0] &&
                input[i][0][1] >= input[i][1][1]) || (
                input[i][1][0] <= input[i][0][0] &&
                input[i][1][1] >= input[i][0][1]
            )) {
            //console.log(input[i]);
            overlaps++;
        }

    }
    console.log(overlaps);
}
function countPartialOverlaps(input) {
    let overlaps = 0;
    for (let i = 0; i < input.length; i++) {
        if (
            !((input[i][0][0] < input[i][1][0] &&
                input[i][0][1] < input[i][1][0]) || (
                input[i][0][0] > input[i][1][1] &&
                input[i][0][1] > input[i][1][1]
            ))) {
                overlaps++;
            }

    }
    console.log(overlaps);
}