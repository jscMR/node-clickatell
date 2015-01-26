'use strict'
var merge = require('util')._extend;
var request = require('request');

function Rest(options){
    this.options = options;
}

Rest.prototype.getDefaults = function(){
    var defaults = {
        mode : 1,
        user : null,
        password : null,
        api_id : null,
        auth_token : null,
        api_message_url: 'https://api.clickatell.com/rest/message'
    };
    return merge(defaults, this.options);
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
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Length': post_data.length,
            'Authorization': 'Bearer ' + this.options.auth_token
        },
        json: true,
        body: post_data
    };

    request.post(options,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body);
                console.log(body)
            }else{
                callback(error);
                console.log(error);
            }
        }
    );

};
module.exports = Rest;