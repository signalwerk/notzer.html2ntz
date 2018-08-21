var cheerio = require("cheerio");
var juice = require("juice");
var path = require("path");
var fs = require("fs");
var CSS = require("notzer.css-ntz")

// var defaultCSS  = require("notzer.css-ntz");
const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

let $ = null;

class Html2ntz {
  constructor(html) {
    this.html = html || "";
    this.css = [];
  }

  // if the node is an element (p, h1, ...) we handle that
  elementHandler(element) {
    // get the css to have the parser instructions
    var nodeStyle = element.css();

    // the type generates defines the element handler
    switch (this.cssTrim(nodeStyle["-ntz-processor--type"])) {
      case "root":
        return this.generalTagHandler(element, nodeStyle);
        break;
      case "paragraph":
        return this.generalTagHandler(element, nodeStyle);
        break;
      case "inline":
        return this.generalTagHandler(element, nodeStyle);
        break;
      case "text":
        return this.generalTagHandler(element, nodeStyle);
        break;
      case "table":
        return this.generalTagHandler(element, nodeStyle);
        break;
      case "tr":
        return this.generalTagHandler(element, nodeStyle);
        break;
      case "td":
        return this.generalTagHandler(element, nodeStyle);
        break;
      case "th":
        return this.generalTagHandler(element, nodeStyle);
        break;
      case "img":
        let obj = this.generalTagHandler(element, nodeStyle);
        obj.processor.src = element[0].attribs.src || '';
        obj.processor.alt = element[0].attribs.alt || '';
        return obj;
        break;
      default:
        // if we have no special handler we just parse the text
        return this.childerenHandler(element);
    }
  }

  // each node needs to be handled by it's type
  // https://developer.mozilla.org/en/docs/Web/API/Node/nodeType
  nodeHandler(node) {
    var astObj = {};

    switch (node.nodeType) {
      case ELEMENT_NODE: // ELEMENT_NODE -- An Element node such as <p> or <div>.
        astObj = this.elementHandler($(node));
        break;
      case TEXT_NODE: // 	TEXT_NODE -- The actual Text of Element or Attr.
        astObj = {
          processor: {
            type: "text"
          },
          value: node.nodeValue
        };
        break;
      case 8: // 	COMMENT_NODE -- no handling for comments
        break;
      default:
        console.log("error: not supported node-style:", node.nodeType);
    }
    return astObj;
  }

  // trims spaces and ' " from a string
  // we get strings like "'test'" from the CSS definitions
  cssTrim(str) {
    if (str) {
      return str.replace(/^[\s'"]+|[\s'"]+$/g, "");
    }
    return str;
  }

  // for each child we do a new node handling
  childerenHandler(element) {
    var astArray = [];
    element.contents().each((index, element) => {
      astArray.push(this.nodeHandler(element));
    });
    return astArray;
  }

  generalTagHandler(element, style) {
    let parsed = {};

    // process
    Object.keys(style).map((objectKey, index) => {
      if (objectKey.startsWith("-ntz-")) {
        var match = /^-ntz-([a-zA-Z0-9-]+)--([a-zA-Z0-9-]+)/.exec(objectKey);
        if (match) {
          parsed[match[1]] = parsed[match[1]] || {};
          parsed[match[1]][match[2]] = this.cssTrim(style[objectKey]);
        } else {
          console.log("Wrong attribute: " + objectKey);
        }
      }
    });
    parsed.children = this.childerenHandler(element);
    return parsed;
  }

  parser(html) {
    // final ast
    var astArray = [];

    // generate cheerio instance
    $ = cheerio.load(html);

    // what's the root object
    var root = $("body");

    var astArray = this.childerenHandler(root);

    return astArray;
  }

  inlineCss(html) {
    // inline style and run parser
    return this.parser(juice(html));
  }

  // remove whitespace between tags
  whitespaceRemove(element) {
    $(element).contents().filter((index, item) => {

      // recursion for
      if (item.nodeType === ELEMENT_NODE) {
        this.whitespaceRemove(item)
      }
      return item.nodeType === TEXT_NODE && item.nodeValue.trim() === "";
    }).remove();
  }


  // generate the ast
  parse(html) {

    // generate cheerio instance
    $ = cheerio.load(html);

    // prepend default css
    $('head').prepend('<style type="text/css">' + CSS + '</style>');

    // add all the other css files
    this.css.forEach(CSS => $('head').append('<style type="text/css">' + CSS + '</style>'))

    // remove whitespace
    this.whitespaceRemove($('body'));

    return this.inlineCss($.html());
  }
}

module.exports = Html2ntz;
