const fs = require("fs");

console.log("Hello NodeJs!\n")

function callback(err, result) {
  console.log(result)
}

fs.readFile("./poem.txt", { encoding: "utf-8"}, callback);

const year = fs.readFileSync(
  "./year.txt",
  { encoding: "utf-8"}
  )
console.log(year)
