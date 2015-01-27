'use strict'
var merge = require('util')._extend;
var request = require('request');

function Http(options){
    this.options = this.getDefaults(options);
}

Http.prototype.getDefaults = function(options){
    var defaults = {
        mode : 'http',
        auth_token: null,
        user : null,
        password : null,
        api_id : null,
        api_message_url: 'http://api.clickatell.com/http/sendmsg',
        querymsg_url:'http://api.clickatell.com/http/querymsg'
    };
    return merge(defaults, options);
};

Http.prototype.sendMsg = function(msg,to,callback){
    var url = this.options.api_message_url+'?user='+
        this.options.user+'&password='+
        this.options.password+'&api_id='+
        this.options.api_id+'&to='+to+'&text='+msg;

    this.getHttp(url,callback);
};

Http.prototype.queryMsg = function(id_msg,callback){


    var url = this.options.querymsg_url+
        '?user='+this.options.user+
        '&password='+this.options.password+
        '&api_id='+this.options.api_id+
        '&apimsgid='+id_msg;

    this.getHttp(url,callback);
};

Http.prototype.getHttp = function(url,callback){
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }else{
            callback(error);
        }
    });
}

module.exports = Http;