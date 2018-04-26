module.exports = {
  register: function(Handlebars) {
    Handlebars.registerHelper("text", function(txt) {
      return new Handlebars.SafeString(txt);
    });
  }
};
