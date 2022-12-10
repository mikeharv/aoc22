const fs = require("fs");

const lines = fs
  .readFileSync("day09.txt", { encoding: "utf-8" })
  .split("\n")
  .map((line) => line.split(' '))
  .map((arr) => {
    return {
        dir: arr[0],
        dis: arr[1]
    }
  })

const rope = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0}
];

const visited = [];
console.log("== Initial State ==");
drawMap(rope);
function simulateDrags(input, rope) {
    input.forEach(command => updatePositions(command, rope))
}

function updatePositions(command, rope) {
    console.log(`== ${command.dir} ${command.dis} ==`);
    for (let i=0; i<command.dis; i++) {
        switch (command.dir) {
            case "R":
                rope[0].x++;
                break;
            case "L":
                rope[0].x--;
                break;
            case "U":
                rope[0].y++;
                break;
            case "D":
                rope[0].y--;
                break;
        }
        for(let j=0; j<rope.length-1;j++) {
            updateTail(rope[j], rope[j+1], j+1);
        }
        drawMap(rope);
    }
}

function updateTail(headLoc, tailLoc, pos) {
    //If the head is ever two steps directly up, down, left, or right from the tail, 
    //the tail must also move one step in that direction so it remains close enough:
    const delta = getDelta(headLoc, tailLoc);
    if(Math.abs(delta.x) <=1 && Math.abs(delta.y) <=1) {
        // No action needed
    } else if(delta.x == 2 && delta.y == 0) {
        tailLoc.x++;
    } else if(delta.x == -2 && delta.y == 0) {
        tailLoc.x--;
    } else if(delta.y == 2 && delta.x == 0) {
        tailLoc.y++;
    } else if(delta.y == -2 && delta.x == 0) {
        tailLoc.y--;
        //Otherwise, if the head and tail aren't touching and aren't in the same row or column, 
        //the tail always moves one step diagonally to keep up:
    } else if(delta.x >= 1 && delta.y >= 1) {
        console.log("NE");
        tailLoc.x++;
        tailLoc.y++;
    } else if(delta.x <= -1 && delta.y <= -1) {
        tailLoc.x--;
        tailLoc.y--;
    } else if(delta.x <= -1 && delta.y >= 1) {
        tailLoc.x--;
        tailLoc.y++;
    } else if(delta.y <= -1 && delta.x >= 1) {
        tailLoc.x++;
        tailLoc.y--;
    } else {
        console.log("!!! missed case:", pos, headLoc, tailLoc, delta);
    }
    const tailCoords = [tailLoc.x, tailLoc.y];
    if(pos == 9) {
        if(!visited.find(arr => JSON.stringify(arr)==JSON.stringify(tailCoords))) {
            visited.push(tailCoords);
        }
    }
}

function getDelta(headLoc, tailLoc) {
    return {
        x: headLoc.x - tailLoc.x,
        y: headLoc.y - tailLoc.y
    }
}

function drawMap(rope) {
    let map = [];
    const headLoc = rope[0];
    const tailLoc = rope[1];
    const maxCol = Math.max(5, ...rope.map(obj => obj.x+1));
    const maxRow = Math.max(5, ...rope.map(obj => obj.y+1));
    const minCol = Math.min(0, ...rope.map(obj => obj.x-1));
    const minRow = Math.min(0, ...rope.map(obj => obj.y-1));
    for(let mapY=minRow; mapY<maxRow; mapY++) {
        map.push([]);
        for(let mapX=minCol; mapX<maxCol; mapX++) {
            let row = map[map.length-1];
            let symbol = "*";
            if(mapX == 0 && mapY == 0) {
                symbol = "s";
            }
            for(let k=rope.length-1; k>=0; k--) {
                if(rope[k].x == mapX && rope[k].y == mapY) {
                    // console.log(mapX, mapY, k);
                    if (k == 0) {
                        symbol = "H";
                    } else {
                        symbol = `${k}`;
                    }
                }
            }
            row.push([symbol]);
        }
    }
    console.log(map.map(row => row.join().replace(",","")).reverse());
}

simulateDrags(lines, rope);
console.log(visited.length);