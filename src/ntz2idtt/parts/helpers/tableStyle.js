module.exports = {
  register: function(Handlebars) {
    Handlebars.registerHelper("TableStyle", function(name, options) {
      var nameFinal = name || "NormalTableStyle";
      var txt = options.fn(this);
      return new Handlebars.SafeString("<TableStyle:" + nameFinal + ">" + txt); //+ '<ParaStyle:>'
    });
  }
};
