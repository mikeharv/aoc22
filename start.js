const fs = require("fs");

const lines = fs
  .readFileSync("start.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => parseInt(x));

console.log(lines);