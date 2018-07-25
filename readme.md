# Notzer → html2ntz
Convert a HTML-File with CSS-Rules to the Notzer-Fileformat.


## install
```sh
npm install notzer.html2ntz --save
```

## usage
```js
var fs = require("fs");
const { html2ntz } = require("../src/");

var html = String(fs.readFileSync("./index.html")); // the general HTML
var CSS = String(fs.readFileSync("./style.css")); // additional CSS

// parse html to ntz
let notzer = new html2ntz();

notzer.css.push(CSS);

notzer.parse(html, AST => {
  // write notzer file
  let output = JSON.stringify(AST, null, 4);
  fs.writeFileSync("./test.ntz.json", output);
});
```
