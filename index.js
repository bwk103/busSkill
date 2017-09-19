var Alexa = require('alexa-sdk');
var https = require('https');
var apiResponse = require('Testresult');
// require('dotenv').config();


exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function() {
    var mythis = this;
    var resultString = '';
    https.get('https://api.tfl.gov.uk/StopPoint/40004406076A/Arrivals?app_id=5efe9e71&app_key=e4b6c1cfc9c5c20687aa8e7cb7a2470c', (res) => {
      res.on('data', (d) => {
        resultString += d
      });
      res.on('end', function(res) {
        response = JSON.parse(resultString)
        const output = Math.floor(parseInt(response[0].timeToStation) / 60);
        mythis.emit(':tell', 'There are ' + output + ' minutes until the next bus.')
      })
    })
  }
}
