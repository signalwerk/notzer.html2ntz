var mm2pt = function(mm) {
  return mm * 72 / 25.4;
};

module.exports = {
  register: function(Handlebars) {
    Handlebars.registerHelper("ColWidth", function(withInMM) {
      var fWidth = mm2pt(withInMM || 10);

      return new Handlebars.SafeString(
        "<ColStart:<tColAttrWidth:" + fWidth + ">>"
      );
    });
  }
};
