var cheerio = require("cheerio");
var juice = require("juice");
var fs = require("fs");
var path = require("path");

let $ = null;

class html2ntz {
  constructor(html) {
    this.html = html || "";
  }

  // if the node is an element (p, h1, ...) we handle that
  elementHandler(element) {
    // get the css to have the parser instructions
    var nodeStyle = element.css();

    // the type generates defines the element handler
    switch (this.cssTrim(nodeStyle["-ntz-type"])) {
      case "root":
        return this.generalTagHandler(element, nodeStyle);
        break;
      case "paragraph":
        return this.generalTagHandler(element, nodeStyle);
        break;
      case "inline":
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
      case 1: // ELEMENT_NODE -- An Element node such as <p> or <div>.
        astObj = this.elementHandler($(node));
        break;
      case 3: // 	TEXT_NODE -- The actual Text of Element or Attr.
        astObj = {
          type: "text",
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

    Object.keys(style).map((objectKey, index) => {
      if (objectKey.startsWith("-ntz-")) {
        parsed[objectKey.substring(5)] = this.cssTrim(style[objectKey]);
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

    // output as json
    var output = JSON.stringify(astArray, null, 4);

    fs.writeFileSync("./catalogue.json", output);
  }

  inlineCss(html) {
    // where to find the parser control file
    var juiceOptions = {
      webResources: {
        relativeTo: path.dirname(__filename) + "/parserstyle"
      }
    };

    // inline style and run parser
    juice.juiceResources(html, juiceOptions, (err, cssHTML) => {
      if (err) {
        throw err;
      }

      // delete space between tags
      var trimCssHTML = cssHTML.replace(/>\s+</g, "><");

      // save inlined file
      fs.writeFileSync("./catalogue_inline.html", trimCssHTML);

      this.parser(trimCssHTML);
    });
  }

  // generate the icsEvent
  parse(html) {
    this.inlineCss(html);
  }
}

var exports = (module.exports = {
  html2ntz
});
