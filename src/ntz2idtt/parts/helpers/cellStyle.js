module.exports = {
  register: function(Handlebars) {
    Handlebars.registerHelper("CellStyle", function(name, options) {
      var nameFinal = name || "NormalCellStyle";
      var txt = options.fn(this);

      return new Handlebars.SafeString(
        "<CellStyle:" + nameFinal + "><StylePriority:0>" + txt
      ); 
    });
  }
};
