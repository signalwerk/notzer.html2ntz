module.exports = {
  register: function(Handlebars) {
    Handlebars.registerHelper("Table", function(rows, columns, options) {
      // <TableStart:2,2:0:0> ==> rows, columns, header rows, footer rows

      var fRows = rows || 1;
      var fColumns = columns || 1;

      var txt = options.fn(this);

      return new Handlebars.SafeString(
        "<TableStart:" + fRows + "," + fColumns + ":0:0>" + txt + "<TableEnd:>"
      );
    });
  }
};
