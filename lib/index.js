require('dotenv').config();
var Alexa = require('alexa-sdk');
var https = require('https');


exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function() {
    var speakText = 'Welcome to bus times. Would you like to check the time for your favourite stop?'
    var reSpeakText = "I'm sorry, I didn't catch that. Would you like me to check your favourite stop for you?"
    this.emit(':ask', speakText, reSpeakText);
  },

  'AMAZON.YesIntent': function() {
    var mythis = this;
    var apiResponse = '';
    https.get('https://api.tfl.gov.uk/StopPoint/40004406076A/Arrivals?app_id=' + process.env.APP_ID + '&app_key=' + process.env.APP_KEY, (res) => {

        res.on('data', (d) => {
          apiResponse += d;
        });

        res.on('end', function(res) {
          var jsonResponse = JSON.parse(apiResponse)
          if (jsonResponse.length > 1) {
            var nextBus = sortResults(jsonResponse)[0];
          } else {
            var nextBus = jsonResponse[0]
          }
          var minutesRemaining = Math.floor(parseInt(nextBus.timeToStation) / 60)
          mythis.emit(':tell', 'The next ' + nextBus.lineId + ' towards ' + nextBus.destinationName + ' is in ' + minutesRemaining + ' minutes.')
        });
      });
  },

  'AMAZON.StopIntent': function() {
    var speakText = 'Okay, Goodbye!'
    this.emit(':tell', speakText);
  }

}

function sortResults(busses){
  var sortedResults = busses.sort(compareByTime());
  return sortedResults;
}

function compareByTime() {
  return function(a, b){
    if (a.timeToStation < b.timeToStation) return -1;
    if (a.timeToStation > b.timeToStation) return 1;
    return 0;
  };
}
