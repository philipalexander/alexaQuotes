'use strict';
var rp = require('request-promise');
var ENDPOINT = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes';

function QuotesDataHelper() {
}

QuotesDataHelper.prototype.requestQuote = function() {
  return this.getQuote().then(
    function(response) {
      console.log('success - quote: ' + response);
      return response.body;
    }
  );
};

QuotesDataHelper.prototype.getQuote = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

module.exports = QuotesDataHelper;
