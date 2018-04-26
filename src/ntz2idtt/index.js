var fs = require("fs");
var _ = require("lodash");
var handlebars = require("./parts/handlebars");

class ntz2idtt {
  constructor() {
    this.template = handlebars();
  }

  tableCol(dataCol, table) {
    var col = dataCol;

    if (col.processor && col.processor.type === "tr") {
      return col;
    }
    if (col.processor && col.processor.type === "td") {
      return col;
    }
    console.log("Table Row can only have TH or TD children");
    return;
  }
  tableRow(dataRow, table) {
    var rows = dataRow;

    // ups we unpacked one too much...
    if (!_.isArray(rows)) {
      rows = [rows];
    }

    _.forEach(rows, item => {
      var row = item;
      var style = row.style || {};

      // if there was a tg arrround the tr-tags
      if (_.isArray(row)) {
        this.tableRow(row, table);
        return;
      }

      if (row.processor && row.processor.type === "tr") {
        var rowCells = [];
        _.forEach(row.children, (cell, iteratee) => {
          rowCells.push(this.tableCol(cell, table));
          if (table.processor.colWidth.length - 1 < iteratee) {
            table.processor.colWidth.push(-1);
          }
          table.processor.colWidth[iteratee] = Math.max(
            table.processor.colWidth[iteratee],
            cell.style.width
          );
        });

        table.processor.rows.push({
          style: style,
          children: rowCells
        });
        table.processor.rowCount = table.processor.rows.length;
        table.processor.columnCount = Math.max(
          table.processor.columnCount,
          rowCells.length
        );
      } else {
        console.log(
          "error! table child is not a tr!",
          row.length,
          JSON.stringify(row)
        );

        return;
      }
    });
  }

  table(table) {
    if (table.children) {
      table.processor.colWidth = [];
      table.processor.rowCount = 0;
      table.processor.columnCount = 0;
      table.processor.rows = [];
      this.tableRow(table.children, table);
    } else {
      console.log("table has no children");
    }
  }

  _preprocess(dataIn) {
    var data = dataIn;

    if (_.isArray(data)) {
      _.forEach(data, item => {
        this._preprocess(item);
      });
    }

    if (_.isObject(data)) {
      if (data.processor && data.processor.type === "table") {
        this.table(data);
        this._preprocess(data.children);
      }
      if (data.children) {
        this._preprocess(data.children);
      }
    }
    return data;
  }

  // generate the ast
  generate(ntzAst, cb) {
    let data = this._preprocess(ntzAst);

    let output = JSON.stringify(data, null, 4);
    fs.writeFileSync("./DATA/_processed/catalogue_preprocessor.json", output);

    let out = this.template(data);
    cb(out);
  }
}

var exports = (module.exports = {
  ntz2idtt
});
