var fs = require("fs");
const { html2ntz } = require("../src/");
// const { ntz2idtt } = require("./src/ntz2idtt/");

var html = String(fs.readFileSync("./data/index.html"));
var CSS = String(fs.readFileSync("./data/style.css"));

// parse html to ntz
let notzer = new html2ntz();

notzer.css.push(CSS);

notzer.parse(html, AST => {
  // write notzer file
  let output = JSON.stringify(AST, null, 4);
  fs.writeFileSync("./data/index.ntz.json", output);
});
