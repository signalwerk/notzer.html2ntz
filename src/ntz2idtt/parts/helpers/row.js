var mm2pt = function(mm) {
  return mm * 72 / 25.4;
};

module.exports = {
  register: function(Handlebars) {
    Handlebars.registerHelper("Row", function() {
      var txt = arguments[arguments.length - 1].fn(this);

      var additions = "";
      // {{#Row 12}} ==> a row with 12 mm minHeight
      if (arguments.length >= 2) {
        var minHeight = mm2pt(arguments[0] || 0);
        additions = "<tRowAttrMinRowSize:" + minHeight + ">"; // '<tRowAttrHeight:90.70866141732284>'
      }

      return new Handlebars.SafeString(
        "<RowStart:" + additions + ">" + txt + "<RowEnd:>"
      ); //+ '<ParaStyle:>'
    });
  }
};
