var debug = require('debug')('browser-monkey:angular')
var Mount = require('./mount');
var createMonkey = require('./create');
var createTestDiv = require('./createTestDiv');

module.exports = function(app) {
  return new Mount(app, {
    stopApp: function(){},
    startApp: function(){
      debug('Mounting angular app ' + app.moduleName)
      var div = createTestDiv();
      div.setAttribute(app.directiveName, '');
      angular.bootstrap(div, [app.moduleName]);

      return createMonkey(document.body);
    }
  }).start();
}
