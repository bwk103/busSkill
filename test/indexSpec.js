var assert = require('assert');
var bst = require('bespoken-tools');

describe('Bus Times', function() {
    var server = null;
    var alexa = null;

    beforeEach(function (done) {
        server = new bst.LambdaServer('./lib/index.js', 10000, true);
        alexa = new bst.BSTAlexa('http://localhost:10000');
        server.start(function () {
            alexa.start(function (error) {
                if (error !== undefined) {
                    console.error("Error: " + error);
                } else {
                    done();
                }
            })
        });
    });

    afterEach(function(done) {
        alexa.stop(function () {
            server.stop(function () {
                done();
            });
        });
    });

  describe('LaunchIntent', function() {
    it('Launches the skill and welcomes the user', function(done) {
      this.timeout(10000);
      alexa.launched(function (error, payload) {
        assert.equal(payload.response.outputSpeech.ssml, '<speak> Welcome to bus times. Would you like to check the time for your favourite stop? </speak>')
        done();
      });
    });
  });

})
