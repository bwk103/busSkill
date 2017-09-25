require('dotenv').config();
var Alexa = require('alexa-sdk');
var https = require('https');
// var jsonResponse = require('./TestEmptyArray.json')


exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function() {
    var mythis = this;
    var apiResponse = '';

    https.get('https://api.tfl.gov.uk/StopPoint/' + process.env.STOP_POINT + '/Arrivals?app_id=' + process.env.APP_ID + '&app_key=' + process.env.APP_KEY, (res) => {

        res.on('data', (d) => {
          apiResponse += d;
        });

        res.on('end', function(res) {
          var jsonResponse = JSON.parse(apiResponse)

          if (jsonResponse.length > 1) {
            var nextBus = sortResults(jsonResponse)[0];
            var followingBus = sortResults(jsonResponse)[1];
            mythis.emit(':tell',
                        'The next ' + nextBus.lineId + ' towards ' + nextBus.destinationName + ' is in ' + minutesRemaining(nextBus) +
                        ' minutes. After that, the following bus is due in ' + minutesRemaining(followingBus) + ' minutes.');
          } else if (jsonResponse.length === 1) {
            var nextBus = jsonResponse[0]
            mythis.emit(':tell',
                        'The next ' + nextBus.lineId + ' towards ' + nextBus.destinationName + ' is in ' + minutesRemaining(nextBus) +
                        ' minutes. There is no information regarding later busses currently available.');
          } else {
            mythis.emit(':tell', "I'm sorry, there are no busses due any time soon.");
          }
        });
    });
  },

  'AMAZON.NoIntent': function() {
    var speakText = 'Okay, goodbye!'
    this.emit(':tell', speakText);
  },

  'AMAZON.StopIntent': function() {
    var speakText = 'Okay, goodbye!'
    this.emit(':tell', speakText);
  },

  'AMAZON.HelpIntent': function() {
    var speakText = "This skill lets you know when your next bus is due."
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

function minutesRemaining(bus) {
  return Math.floor(parseInt(bus.timeToStation) / 60);
}
