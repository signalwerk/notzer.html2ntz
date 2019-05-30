const fs = require("fs");
const path = require("path");

const Html2ntz = require("../../src/");
let notzer = new Html2ntz();
notzer.defaultCSS = false;

let testCSS = `
  p,
  h1, h2, h3, h4, h5, h6 {
    -ntz-processor--type: "text";
    -ntz-style--display: "block";
  }

  span {
    -ntz-processor--type: "inline";
    -ntz-processor--title: "";
  }
`;

notzer.css.push(testCSS);


const html = fs.readFileSync(path.resolve(__dirname, "./test.html"));

let output = JSON.stringify(notzer.parse(html).data(), null, 4);
fs.writeFileSync(path.resolve(__dirname, "./test.ntz.json"), output);
