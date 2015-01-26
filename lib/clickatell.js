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


// Package version
var VERSION = require('../package.json').version;
var MODE = [http,rest,soap,xml,com];

function Clickatell(options){
  if (!(this instanceof Clickatell)){
    return new Clickatell(options);
  }

  this.VERSION = VERSION;

 if(!options.mode || (options.mode<0 && options.mode>4)){
   options.mode = 0; //default http
 }
  this.module = new MODE[options.mode](options);
};


Clickatell.prototype.sendmsg = function(msg,to,callback){
  this.module.sendMsg(msg,to,callback);

};



module.exports = Clickatell;
