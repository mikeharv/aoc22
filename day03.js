const fs = require("fs");

const lines = fs
  .readFileSync("day03.txt", { encoding: "utf-8" })
  .split("\n")
  .map((line) => [line.substring(0,line.length/2), line.substring(line.length/2)]);

const lines2 = fs
  .readFileSync("day03.txt", { encoding: "utf-8" })
  .split("\n")
  .map((line) => [line]);

findDuplicates(lines);
function findDuplicates(input) {
    let duplicates = [];
    for(let i=0; i<input.length; i++) {
        for(let j=0; j<input[i][0].length; j++){
            if(input[i][1].includes(input[i][0].charAt(j))) {
                duplicates.push(input[i][0].charAt(j));
                break;
            }
        }
    }
    getPriorities(duplicates);
}
findTriples(lines2);
function findTriples(input) {
    let triples = [];
    for(let i=0; i<input.length; i+=3) {
        for(let j=0;j<input[i][0].length;j++){
            let letter = input[i][0].charAt(j);
            if(
                input[i+1][0].includes(letter) &&
                input[i+2][0].includes(letter)
                ) {
                    triples.push(letter);
                    break;
                }
        }
    }
    getPriorities(triples);
}

function getPriorities(items) {
    let lowerCase = items.filter(char => char.charCodeAt(0) > 95)
    .map(char => char.charCodeAt(0)-96);
let upperCase = items.filter(char => char.charCodeAt(0) < 95)
    .map(char => char.charCodeAt(0)-64+26);
console.log(
    lowerCase.reduce((partialSum, a) => partialSum + a, 0)
    + upperCase.reduce((partialSum, a) => partialSum + a, 0)
    );
}

let letNums = [];
for(let i=65; i<91; i++){
    letNums.push([i,String.fromCharCode(i)])
}
for(let i=97; i<123; i++){
    letNums.push([i,String.fromCharCode(i)])
}