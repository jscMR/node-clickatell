'use strict'
var merge = require('util')._extend;
var request = require('request');

function Http(options){
    this.options = options;
}

Http.prototype.getDefaults = function(){
    var defaults = {
        mode : 0,
        auth_token: null,
        user : null,
        password : null,
        api_id : null,
        api_message_url: 'http://api.clickatell.com/http/sendmsg'
    };
    return merge(defaults, this.options);
};

Http.prototype.sendMsg = function(msg,to,callback){
    this.options = this.getDefaults();
    var url = this.options.api_message_url+'?user='+
        this.options.user+'&password='+
        this.options.password+'&api_id='+
        this.options.api_id+'&to='+to+'&text='+msg;

    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }else{
            callback(error);
        }

        //if(error) throw error;
    });
};

module.exports = Http;