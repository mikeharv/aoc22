const fs = require("fs");

const lines = fs
  .readFileSync("day05.txt", { encoding: "utf-8" })
  .split("\n")
  //.map((x) => parseInt(x));

//console.log(lines);

const stacksText = lines.splice(0, lines.indexOf(''));
const commandsText = lines.splice(lines.indexOf('')+1);
let stacks = [];
const numStacks = parseInt(
    stacksText[stacksText.length-1]
    .charAt(stacksText[stacksText.length-1].length-2)
    );
for(let i=0; i<(numStacks); i++) {
    stacks.push([]);
}
for(let i=0; i<numStacks; i++) {
    for(let j=stacksText.length-2; j>=0; j--) {
        const crateChar = stacksText[j].charAt((i*4)+1);
        if(crateChar !== ' ') {
            stacks[i].push(crateChar);
        }
    }
}
const stacks2 = JSON.parse(JSON.stringify(stacks));
const commandsArr = commandsText.map(commandText => commandText.split(' '));
const commands = commandsArr.map(commandArray => {
    return {
        quantity: parseInt(commandArray[1]),
        origin: parseInt(commandArray[3])-1,
        destination: parseInt(commandArray[5])-1
    }
})
//console.log(commands);

function crateMover9000(stacks, commands){
    for(let i=0; i<commands.length; i++) {
        for(let j=0; j<commands[i].quantity; j++) {
            moveSingle(commands[i].origin, commands[i].destination);
        }
    }
    return stacks;
}

function moveSingle(origin, destination) {
    stacks[destination]
    .push(stacks[origin].pop());
}

//console.log(stacks);
topCrates(crateMover9000(stacks,commands));
function topCrates(stacks){
    let topCrates = '';
    for(let i=0; i<stacks.length; i++){
        topCrates+=stacks[i][stacks[i].length-1];
    }
    console.log(topCrates);
}
//console.log(stacks2);

crateMover9001(stacks2, commands);
function crateMover9001(stacks, commands){
    //console.log(stacks);
    for(let i=0; i<commands.length; i++) {
        moveSet(
            stacks,
            commands[i].origin,
            commands[i].destination,
            commands[i].quantity
            );
    }
    return stacks;
}
function moveSet(stacks, origin, destination, quantity) {
    //console.log(quantity, origin, destination, stacks[origin], stacks[origin].length)
    //console.log(stacks);
    stacks[destination].push(
        ...stacks[origin].splice(stacks[origin].length-quantity)
    );
    //console.log(stacks);
}
topCrates(stacks2);