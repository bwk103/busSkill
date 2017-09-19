var Alexa = require('alexa-sdk');


exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function() {
    this.emit('Welcome');
  },
  'Welcome': function(){
    this.emit(':tell', 'Welcome to Bus Times');
  }
}
