'use strict'
var merge = require('util')._extend;
var request = require('request');

function Rest(options){
    this.options = this.getDefaults(options);
}

Rest.prototype.getDefaults = function(options){
    var defaults = {
        mode : 'rest',
        user : null,
        password : null,
        api_id : null,
        auth_token : null,
        api_message_url: 'https://api.clickatell.com/rest/message'
    };
    return merge(defaults, options);
};

Rest.prototype.sendMsg = function(msg,to,callback){
    this.options = this.getDefaults();
    var post_data = JSON.stringify({
        text:msg,
        to:to
    });

    //callback(post_data);
    var options = {
        url: this.options.api_message_url,
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "X-Version": 1,
            "Content-Length": post_data.length,
            "Authorization": 'bearer ' + this.options.auth_token
        },
        body: post_data
    };
    this.postHttp(options,callback);


};

Rest.prototype.queryMsg = function(id_msg,callback){
    var post_data = JSON.stringify({
        clientMessageId:id_msg
    });
    var url = this.options.api_message_url+'/'+id_msg;

    var options = {
        url:  this.options.api_message_url+'/'+id_msg,
        headers: {
            "Content-Type": 'text/html',
            "X-Version": 1,
            "Authorization": 'bearer ' + this.options.auth_token
        }
    };

    this.getHttp(options,callback);
};

Rest.prototype.postHttp = function(options,callback){
    request.post(options,
        function (error, response, body) {
            if (!error && (response.statusCode >= 200 && response.statusCode <= 206)) {
                callback(body);
            }else{
                callback(error);
            }
        }
    );
};

Rest.prototype.getHttp = function(options,callback){
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }else{
            callback(error);
        }
    });
}

module.exports = Rest;