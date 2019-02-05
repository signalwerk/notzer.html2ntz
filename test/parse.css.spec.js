// parse html to ntz
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const Html2ntz = require("../src/");

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

describe("Tag", function() {
  describe("parse with default CSS", function() {
    it("text blocks should get notzer attributes", function() {
      assert.deepEqual(notzer.parse("<h1/>").data(), [
        {
          type: "element",
          ntz: {
            processor: {
              type: "text"
            },
            style: {
              display: "block"
            }
          },
          // css: {
          //   "-ntz-processor--type": "'text'",
          //   "-ntz-style--display": "'block'"
          // },
          name: "h1"
        }
      ]);
    });

    it("spans should get inline notzer attributes", function() {
      assert.deepEqual(notzer.parse("<span/>").data(), [
        {
          type: "element",
          name: "span",
          ntz: {
            processor: {
              type: "inline",
              title: ""
            }
          },
          // css: {
          //   "-ntz-processor--title": "''",
          //   "-ntz-processor--type": "'inline'"
          // }
        }
      ]);
    });
  });
});
