/**
* Module dependencies
*/
'use strict'
var merge = require('util')._extend;
var http = require("./http.js");
var rest = require("./rest.js");
var soap = require("./soap.js");
var xml = require("./xml.js");
var com = require("./com.js");
var request = require('request');


// Package version
var VERSION = require('../package.json').version;
var MODE = {'http':http,'rest':rest,'soap':soap,'xml':xml,'com':com};

function Clickatell(options){
  if (!(this instanceof Clickatell)){
    return new Clickatell(options);
  }

  this.VERSION = VERSION;

   options.mode = this.validateMode(options.mode); //default http

  this.module = new MODE[options.mode](options);
  this.options = options;
};


Clickatell.prototype.sendmsg = function(msg,to,callback){
  this.module.sendMsg(msg,to,callback);

};

Clickatell.prototype.queryMsg = function(id_msg,callback){

    this.module.queryMsg(id_msg,callback);
};

Clickatell.prototype.validateMode = function(mode){
    var modes = ['http','rest','soap','xml','com'];
    if(modes.indexOf(mode)===-1){
        return 'http';//by default
    }else{
        return mode;
    }
}


module.exports = Clickatell;
