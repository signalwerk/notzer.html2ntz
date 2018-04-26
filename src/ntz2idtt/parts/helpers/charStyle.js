module.exports = {
  register: function(Handlebars) {
    Handlebars.registerHelper("CharStyle", function(name, options) {
      var nameFinal = name || "";
      var txt = options.fn(this);

      return new Handlebars.SafeString(
        "<CharStyle:" + nameFinal + ">" + txt + "<CharStyle:>"
      );
    });
  }
};
