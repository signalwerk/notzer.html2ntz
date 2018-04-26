module.exports = {
  register: function(Handlebars) {
    Handlebars.registerHelper("Cell", function() {
      var fColSpan = 1;
      var fRowSpan = 1;

      // {{#Cell 2}} ==> a cell that crosses two columns
      if (arguments.length >= 2) {
        fColSpan = arguments[0] || 1;
      }

      // {{#Cell 1 2}} ==> a cell that crosses one column and two rows
      if (arguments.length >= 3) {
        fRowSpan = arguments[1] || 1;
      }

      var txt = arguments[arguments.length - 1].fn(this);

      return new Handlebars.SafeString(
        "<CellStart:" + fRowSpan + "," + fColSpan + ">" + txt + "<CellEnd:>"
      ); 
    });
  }
};
