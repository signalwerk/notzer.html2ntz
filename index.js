var fs = require('fs');
const {html2ntz} = require('./src/html2ntz/');
// const { Parser } = require("./src/Parser");


var html = String(fs.readFileSync('./DATA/catalogue_short.html'));


let AST = new html2ntz();
AST.parse(html);
// fs.writeFileSync('./catalogue_inline.html', "trimCssHTML");
