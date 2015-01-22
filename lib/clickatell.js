/**
* Module dependencies
*/
var http = require('http');
var merge = require('util')._extend;


// Package version
var VERSION = require('../package.json').version;

function Clickatell(options){
  if (!(this instanceof Clickatell)) return new Clickatell(options);

  this.VERSION = VERSION;

  var defaults = {
    auth_token: null,
    headers: {
      'X-Version' : '1',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'node-clickatell/' + this.VERSION
    },
    rest_message_url: 'https://api.clickatell.com/rest/message'
  };


  this.options = merge(defaults, options);
}


Clickatell.prototype.sendSms = function(msg,to,callback){


  var options = {
    hostname: 'api.clickatell.com',
    port: 80,
    path: '/rest/message',
    method: 'POST',
    headers : this.options.headers,
    auth: this.options.auth_token
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  var data = {
    text : msg,
    to : to
  };

  data = data.toString();

  req.write(data);

  req.end();
}



module.exports = Clickatell;
