var fs = require("fs");
var path = require("path");
var utils = require("./utils");

/**
 * Looks for files with .html, .hbs, or .handlebars extensions within the given directory, and adds them as Handlebars partials matching the name of the file.
 * @param {string} dir - Folder to check for partials.
 */
module.exports = function(Handlebars, dir) {
  var partials = utils.loadFiles(dir, "*.{html,hbs,handlebars}");
  for (var i in partials) {
    var ext = path.extname(partials[i]);
    var file = fs.readFileSync(partials[i]).toString();
    // remove whitespaces in string
    file = file.replace(/\}\}\s+\{\{/g, "}}{{");
    file = file.replace(/_n_/g, "\n");
    file = file.trim();
    var name = path.basename(partials[i], ext);
    Handlebars.registerPartial(name, file.toString());
  }
};
