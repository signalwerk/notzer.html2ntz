var Handlebars = require("handlebars");
var fs = require("fs");
var path = require("path");

var loadBuiltinHelpers = require("./loadBuiltinHelpers");
var loadPartials = require("./loadPartials");

var badChars = /[<>\\]/g;
var possible = /[<>\\]/;
var escape = {
  "<": "\\<",
  ">": "\\>;",
  "\\": "\\\\"
};

module.exports = function() {
  let myInst = Handlebars.create();

  myInst.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);

    if (optionalValue) {
      console.log("Value");
      console.log("====================");
      console.log(optionalValue);
    }
  });

  loadBuiltinHelpers(myInst, "./helpers/");
  loadPartials(myInst, path.join(__dirname, "./components/"));

  myInst.Utils.escapeExpression = function(string) {
    if (typeof string !== "string") {
      // don't escape SafeStrings, since they're already safe
      if (string && string.toHTML) {
        return string.toHTML();
      } else if (string === null) {
        return "";
      } else if (!string) {
        return string + "";
      }

      // Force a string conversion as this will be done by the append regardless and
      // the regex test will do this transparently behind the scenes, causing issues if
      // an object's to string has escaped characters in it.
      string = "" + string;
    }

    if (!possible.test(string)) {
      return string;
    }
    return string.replace(badChars, escapeChar);
  };

  let template = fs.readFileSync(
    path.join(__dirname, "./template/root.hbs"),
    "utf8"
  );

  return myInst.compile(template);
};
