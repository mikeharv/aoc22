const fs = require("fs");

const lines = fs
  .readFileSync("day06.txt", { encoding: "utf-8" })
  .split("\n")

//console.log(lines);

findMarker(lines, 3, 'start-of-packet');

function findMarker(input, testLength, label) {
    for(let i=0; i<input.length; i++) {
        const buffer = input[i];
        let testChars ='';
        for(let j=0; j<buffer.length; j++) {
            const currentChar = buffer.charAt(j);
            if(testChars.includes(currentChar)) {
                // console.log('dup', testChars.indexOf(currentChar)+1, testChars, currentChar);
                testChars=testChars.slice(testChars.indexOf(currentChar)+1)+currentChar;
                // console.log('new', testChars, j);
            } else if(testChars.length < testLength){
                testChars+=currentChar;
                // console.log('new', testChars, j+1);
            } else {
                console.log(label, j+1);
                break;
            }
        }
    }
}

findMarker(lines, 13, 'start-of-message');