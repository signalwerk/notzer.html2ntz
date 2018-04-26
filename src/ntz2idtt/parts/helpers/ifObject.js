module.exports = function(item, options) {
  if (typeof item === "object" && !(item instanceof Array)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};

module.exports = {
  register: function(Handlebars) {
    Handlebars.registerHelper("ifObject", function(item, options) {
      if (typeof item === "object" && !(item instanceof Array)) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });
  }
};
