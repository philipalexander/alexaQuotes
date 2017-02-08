'use strict';
module.change_code = 1;
var Alexa = require('alexa-app');
var app = new Alexa.app('ronswanson');
var QuotesDataHelper = require('./quotes');

app.launch(function(req, res) {
  var prompt = 'To get a Ron Swanson Quote, say, tell me a quote.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('getQuote', {
  'utterances': ['{|get|say|tell|give} {me} {|quote|phrase|}']
},
  function(req, res) {
    var reprompt = 'I missed that. Say again.';
    var quotesHelper = new QuotesDataHelper();
    quotesHelper.requestQuote().then(function(quote) {
      console.log('quote', quote);
      res.say(quote[0]).send();
    }).catch(function(err) {
      console.log('err', err.statusCode);
      var prompt = 'I didn\'t get what you said. Sorry';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
    });
    return false;
  }
);

app.intent('AMAZON.HelpIntent', function(req, res) {
    var prompt = 'You can say tell me a quote, or, you can say exit... What can I help you with?';
    var reprompt = 'What can I help you with?';
    res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
    return false;
  }
);

app.intent('AMAZON.CancelIntent', function(req, res) {
    var prompt = 'Goodbye!';
    res.say(prompt).shouldEndSession(true).send();
    return false;
  }
);

app.intent('AMAZON.StopIntent', function(req, res) {
    var prompt = 'Goodbye!';
    res.say(prompt).shouldEndSession(true).send();
    return false;
  }
);

//hack to support custom utterances in utterance expansion string
console.log(app.utterances().replace(/\{\-\|/g, '{'));
module.exports = app;
