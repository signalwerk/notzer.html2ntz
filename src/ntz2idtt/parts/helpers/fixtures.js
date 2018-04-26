var fixtures = {
  RETURN: "\u000D\u000A", // return window style (because of window header)
  SOFTRETURN: "\u000A",
  TAB: "\u0009", //Tab-Char
  NEXTFRAME: "<cNextXChars:Box>" + "\u000D\u000A", //jump to nextframe
  SPACE: "\u0020",
  RIGHTINDENTTAB: "\u0008",
  NONBREAKINGSPACE: "\u00A0",
  NONBREAKINGSMALSPACE: "\u2009",
  NONBREAKINGHYPEN: "\u2011",
  DiscretionaryHyphen: "\u00AD", // Bedingter Trennstrich
  HeadWinCS3:
    "<UNICODE-WIN>" + "\u000D\u000A" + "<Version:5><FeatureSet:InDesign-Roman>" // WIN CS3 Head
};

module.exports = {
  register: function(Handlebars) {
    Handlebars.registerHelper("fixture", function(id) {
      if (fixtures.hasOwnProperty(id)) {
        return new Handlebars.SafeString(fixtures[id]);
      } else {
        return "";
      }
    });
  }
};
