const fs = require("fs");
const path = require("path");

const Html2ntz = require("../../src/");

const html = fs.readFileSync(path.resolve(__dirname, "./h1.html"));

// parse html to ntz
let notzer = new Html2ntz();

let output = JSON.stringify(notzer.parse(html).data(), null, 4);
fs.writeFileSync(path.resolve(__dirname, "./h1.ntz.json"), output);

var assert = require("assert");

var assert = require("assert");
describe("Tag", function() {
  describe("parse", function() {
    it("empty tag should only return type and name", function() {
      assert.deepEqual(notzer.parse("<h1/>").data(), [
        { type: "element", name: "h1" }
      ]);
    });
    it("tags with text should have children", function() {
      assert.deepEqual(notzer.parse("<h1 >Test</h1>").data(), [
        {
          type: "element",
          name: "h1",
          children: [
            {
              type: "text",
              value: "Test"
            }
          ]
        }
      ]);
    });

    it("tags with attribs should get parsed", function() {
      assert.deepEqual(notzer.parse("<h1 id='hello' />").data(), [
        {
          type: "element",
          name: "h1",
          attributes: {
            id: "hello"
          }
        }
      ]);
    });

    it("tags with a style should get a css key", function() {
      assert.deepEqual(notzer.parse('<h1 style="a:v;"/>').data(), [
        {
          type: "element",
          name: "h1",
          css: {
            a: "v"
          }
        }
      ]);
    });

    it("tags with multiple styles should get multiple keys in the css attribute", function() {
      assert.deepEqual(notzer.parse('<h1 style="a:v;a1:v1;"/>').data(), [
        {
          type: "element",
          name: "h1",
          css: {
            a: "v",
            a1: "v1"
          }
        }
      ]);
    });

    it("tags with multiple children should get them as array in children", function() {
      assert.deepEqual(notzer.parse("<h1><h2>a</h2>Test</h1>").data(), [
        {
          type: "element",
          name: "h1"
        },
        {
          type: "element",
          name: "h2",
          children: [
            {
              type: "text",
              value: "a"
            }
          ]
        },
        {
          type: "text",
          value: "Test"
        }
      ]);
    });
  });
});
