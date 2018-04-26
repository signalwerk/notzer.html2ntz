var utils = require("./utils");
var Fixtures = require("./helpers/fixtures");
var ParagraphStyle = require("./helpers/paragraphStyle");
var IfObject = require("./helpers/ifObject");
var IfCond = require("./helpers/ifCond");
var txt = require("./helpers/text");
var Cell = require("./helpers/cell");
var CellStyle = require("./helpers/cellStyle");
var CharStyle = require("./helpers/charStyle");
var ColWidth = require("./helpers/colWidth");
var Row = require("./helpers/row");
var Table = require("./helpers/table");
var TableStyle = require("./helpers/tableStyle");

module.exports = function(Handlebars) {
  IfObject.register(Handlebars);
  IfCond.register(Handlebars);
  txt.register(Handlebars);
  Cell.register(Handlebars);
  CellStyle.register(Handlebars);
  CharStyle.register(Handlebars);
  ParagraphStyle.register(Handlebars);
  Fixtures.register(Handlebars);
  ColWidth.register(Handlebars);
  Row.register(Handlebars);
  Table.register(Handlebars);
  TableStyle.register(Handlebars);
};
