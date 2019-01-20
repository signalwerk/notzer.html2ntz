# Notzer → html2ntz
Convert a HTML-File with CSS-Rules to the Notzer-Fileformat.


## install
```sh
npm install notzer.html2ntz --save
```

## usage
```js
var fs = require("fs");
const html2ntz = require("notzer.html2ntz");

var html = String(fs.readFileSync("./index.html")); // the general HTML
var CSS = String(fs.readFileSync("./style.css")); // additional CSS

// parse html to ntz
let notzer = new html2ntz();

notzer.css.push(CSS);

// write notzer file
let output = JSON.stringify(notzer.parse(html), null, 4);
fs.writeFileSync("./test.ntz.json", output);
```


## ToDo
* Build Library with [rollup](https://github.com/rollup/rollup-starter-lib/tree/babel).

https://runkit.com/
