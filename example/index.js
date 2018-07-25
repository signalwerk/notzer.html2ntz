var fs = require("fs");
const html2ntz = require("../src/");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "./data/index.html"));
const CSS = fs.readFileSync(path.resolve(__dirname, "./data/style.css"));

// parse html to ntz
let notzer = new html2ntz();

notzer.css.push(CSS);

notzer.parse(html, AST => {
  // write notzer file
  let output = JSON.stringify(AST, null, 4);
  fs.writeFileSync(path.resolve(__dirname, "./data/index.ntz.json"), output);
});
