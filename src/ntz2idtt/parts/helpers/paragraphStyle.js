module.exports = {
  register: function(Handlebars) {
    Handlebars.registerHelper("ParagraphStyle", function(name, options) {
      var nameFinal = name || "NormalParagraphStyle";
      var txt = options.fn(this);

      return new Handlebars.SafeString("<ParaStyle:" + nameFinal + ">" + txt); //+ '<ParaStyle:>'
    });
  }
};
