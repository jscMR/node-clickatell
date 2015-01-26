'use strict'
var request = require('request');

function Http(options){
    console.log("OPTIONS HTTP",options);
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
    return defaults;
};

Http.prototype.sendMsg = function(url,msg,to,callback){
    this.options = this.getDefaults();
    var url = this.options.api_message_url+'?user='+
        this.options.user+'&password='+
        this.options.password+'&api_id='+
        this.options.api_id+'&to='+to+'&text='+msg;

    request(url, function (error, response, body) {
        console.log(body);
        if (!error && response.statusCode == 200) {
            callback(body);
        }

        if(error) throw error;
    });
};

module.exports = Http;