var fs = require("fs");
const { html2ntz } = require("../src/");
// const { ntz2idtt } = require("./src/ntz2idtt/");

var html = String(fs.readFileSync("./data/index.html"));

// parse html to ntz
let h2ntz = new html2ntz();
h2ntz.parse(html, AST => {
  // write notzer file
  let output = JSON.stringify(AST, null, 4);
  fs.writeFileSync("./data/index.ntz.json", output);
});
