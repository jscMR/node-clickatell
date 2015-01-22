/**
* Module dependencies
*/
var merge = require('util')._extend;
var request = require('request');


// Package version
var VERSION = require('../package.json').version;

function Clickatell(options){
  if (!(this instanceof Clickatell)){
    return new Clickatell(options);
  }

  this.VERSION = VERSION;

  var defaults = {
    auth_token: null,
    user : null,
    password : null,
    api_id : null,
    api_message_url: 'http://api.clickatell.com/http/sendmsg'
  };


  this.options = merge(defaults, options);
}


Clickatell.prototype.sendmsg = function(msg,to,callback){

  var url = this.options.api_message_url+'?user='+
            this.options.user+'&password='+
            this.options.password+'&api_id='+
            this.options.api_id+'&to='+to+'&text='+msg;
            
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }

    if(error) throw error;
  });

}



module.exports = Clickatell;
