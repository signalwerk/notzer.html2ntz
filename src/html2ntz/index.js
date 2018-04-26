var cheerio = require("cheerio");
var juice = require("juice");
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
          processor: {
            type: "text",
          },
          value: node.nodeValue,
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
        if(match){

          parsed[match[1]] = parsed[match[1]] || {};
          parsed[match[1]][match[2]] = this.cssTrim(style[objectKey]);

        } else {
          console.log('Wrong attribute: '+objectKey)
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

    // output as json
    // console.log('astArray2', astArray);

    return astArray;

    // var output = JSON.stringify(astArray, null, 4);

    // fs.writeFileSync("./catalogue.json", output);
  }

  inlineCss(html, cb) {
    // where to find the parser control file
    var juiceOptions = {
      webResources: {
        relativeTo: path.dirname(__filename) + "/parserstyle"
      }
    };

    // inline style and run parser
    return juice.juiceResources(html, juiceOptions, (err, cssHTML) => {
      if (err) {
        throw err;
      }

      // delete space between tags
      var trimCssHTML = cssHTML.replace(/>\s+</g, "><");

      // save inlined file
      // fs.writeFileSync("./catalogue_inline.html", trimCssHTML);

      cb(this.parser(trimCssHTML));
    });
  }

  // generate the ast
  parse(html, cb) {
    return this.inlineCss(html, cb);
  }
}

var exports = (module.exports = {
  html2ntz
});
