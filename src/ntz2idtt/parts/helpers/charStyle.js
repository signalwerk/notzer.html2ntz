module.exports = {

  register : function(Handlebars) {
    Handlebars.registerHelper('CharStyle', function(name, options) {

        var nameFinal = name || "";
        var txt = options.fn(this);


        // if(name){
        //   return new Handlebars.SafeString('<CharStyle:' + name + '>' + txt + '<CharStyle:>');
        // } else {
        //   return new Handlebars.SafeString(txt);
        // }
        return new Handlebars.SafeString('<CharStyle:' + nameFinal + '>' + txt + '<CharStyle:>');
    });
  }

}
