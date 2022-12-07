const fs = require("fs");

const lines = fs
  .readFileSync("day07.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => x.split(" "));
  class Command {
    constructor(command, dir) {
        this.command = command;
        if(dir) {
            this.directory = dir;
        }
    }
}
class File {
    constructor(container, size, name) {
        this.container = container;
        this.size = parseInt(size);
        if(name) {
            this.name = name;
        }
    }
}
class Directory {
    constructor(container, name, files) {
        this.container = container;
        this.name = name;
        if(files) {
            this.files=files;
        }
    }
}

const fileSystem = new Directory(null, 'root', {});
let location = fileSystem;
let totalSmallDirectorySize = 0;
let directorySizes =[];
processInput(lines);
function processInput(input) {
    for(let i=0; i<input.length; i++) {
        interpretLine(input[i]);
    }
}
function interpretLine(line) {
    if(line[0] == '$'){
        let command = new Command(line[1], line[2]);
        execute(command);
    } else if(line[0] == 'dir'){
        let directory = new Directory(location, line[1], {});
        location.files[directory.name]=directory;
    } else {
        let file = new File(location, line[0], line[1]);
        location.files[file.name]=file;
    }
};

function execute(command) {
    if(command.command == 'cd') {
        if(command.directory === '/') {
            location = fileSystem;
        } else if (command.directory === '..') {
            location=location.container;
        } else {
            location=location.files[command.directory];
        }
    } else if(command.command == 'ls') {
    }
}

printFileDirectory(fileSystem, '');

function printFileDirectory(directory, spacer) {
    for (const file in directory.files) {
        const currentFile = directory.files[file];
        console.log(
            `${spacer + '- '}${file}: ${
                currentFile.size
                ? `(file, size=${currentFile.size})`
                : `(dir, size=${computeSize(currentFile)})`
            }`
        );
        if(computeSize(currentFile)<100000){
            totalSmallDirectorySize+=computeSize(currentFile);
        }
        if (directory.files[file].files) {
            printFileDirectory(currentFile, spacer + '  ');
        }
    }
}

function computeSize(directory, startingSize =0) {
    let size = 0;
    for (const file in directory.files) {
        const currentFile = directory.files[file];
        let currentSize = getFileSize(currentFile) || getDirectorySize(currentFile, startingSize)
        size+=currentSize;
    }
    return size + startingSize;
}

const fileSystemSize = computeSize(fileSystem);
const remainingSpace = 70000000 - fileSystemSize;
const neededSpace = 30000000 - remainingSpace;
directorySizes.push(['/', fileSystemSize]);
console.log('/', `(dir, size=${fileSystemSize})`);
console.log(totalSmallDirectorySize);
console.log(Math.min(...directorySizes.filter(size => size[1] > neededSpace).map(arr => arr[1])));
function getFileSize(file) {
    return file.size;
}

function getDirectorySize(dir, startingSize) {
    const directorySize = computeSize(dir, startingSize);
    directorySizes.push([dir.name, directorySize]);
    return directorySize;
}