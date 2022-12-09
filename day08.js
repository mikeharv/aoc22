const fs = require("fs");

const lines = fs
  .readFileSync("day08.txt", { encoding: "utf-8" })
  .split("\n")
  .map((row) => [...row].map(num => parseInt(num)));


countVisible(lines);

function countVisible(input) {
    let visibleTrees = 0;
    for(let i=0; i<input.length; i++) {
        for(let j=0; j<input.length; j++) {
            if(treeVisible(input, i, j)) {
                visibleTrees++;
            }
        }
    }
    console.log(visibleTrees);
}

function treeVisible(input, i, j) {
    const sightLines = getSightLines(input, i , j);
    const visibleAngles = sightLines.filter(arr => arr[0] > Math.max(...arr.slice(1,arr.length)));
    //console.log('---',i,j,[input[i][j]],sightLines,'xxx', visibleAngles);
    return visibleAngles.length >= 1;
}

function getSightLines(input, i, j) {
    const row = input[i];
    const column = input.map(row => row[j]);
    const left = row.slice(0,j+1).reverse();
    const right = row.slice(j,row.length);
    const top = column.slice(0,i+1).reverse();
    const bottom = column.slice(i,column.length);
    const sightLines = [left, right, top, bottom];
    return sightLines;

}

countTreesInView(lines);

function countTreesInView(input) {
    let highestScenicScore = 0;
    for(let i=0; i<input.length; i++) {
        for(let j=0; j<input.length; j++) {
            const scenicScore = getScenicScore(input, i, j);
            if(scenicScore > highestScenicScore) {
                highestScenicScore = scenicScore;
            }
        }
    }
    console.log(highestScenicScore);
}

function getScenicScore(input, i, j) {
    const sightLines = getSightLines(input, i , j);
    let score = 1;
    sightLines.forEach(arr => {
        let factor = 0;
        for(let i=1; i<arr.length; i++) {
            factor++;
            if(arr[i]>=arr[0]){
                break;
            }
        }
        score*=factor;
    })
    return score;
}