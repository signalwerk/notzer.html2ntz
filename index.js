var fs = require("fs");
const { html2ntz } = require("./src/html2ntz/");
const { ntz2idtt } = require("./src/ntz2idtt/");

var html = String(fs.readFileSync("./DATA/catalogue.html"));

// parse html to ntz
let h2ntz = new html2ntz();
h2ntz.parse(html, AST => {
  let output = JSON.stringify(AST, null, 4);
  fs.writeFileSync("./DATA/_processed/catalogue.json", output);

  // var AST = JSON.parse(fs.readFileSync('./catalogue.json'));
  let idtt = new ntz2idtt();
  idtt.generate(AST, idtt => {
    fs.writeFileSync("./DATA/_processed/catalogue_utf-8.idtt", idtt);
    fs.writeFileSync("./DATA/_processed/catalogue.idtt", idtt, "utf16le");
  });
});
