'use strict'
var merge = require('util')._extend;
var soap = require('soap');

function Soap(options){
    this.options = this.getDefaults(options);
}

Soap.prototype.getDefaults = function(options){
    var defaults = {
        mode : 'soap',
        auth_token: null,
        user : null,
        password : null,
        api_id : null,
        api_message_url: 'https://api.clickatell.com/soap/webservice.php?wsdl'
    };
    return merge(defaults, options);
};

Soap.prototype.sendMsg = function(args,callback){
    this.options = this.getDefaults();
   var post_data = {
        "user":this.options.user,
        "password":this.options.password,
        "api_id":this.options.api_id,
        "to":args.to,
        "text":args.msg
    };

    soap.createClient(this.options.api_message_url, function(err, client){
        if(err){
            callback(err);
            return;
        }
        client.setSecurity(new soap.WSSecurity(post_data.user, post_data.password));
        //console.log(client);
        client.sendmsg(post_data, function(err, result){

            console.log(result);
            if (!err) {
                callback(result);
            }
            if (err) throw err;
        });
    });

};

Soap.prototype.queryMsg = function(id_msg,callback){
    var post_data = {
        "user":this.options.user,
        "password":this.options.password,
        "api_id":this.options.api_id,
        "apimsgid":id_msg
    };
    soap.createClient(this.options.api_message_url, function(err, client){
        if(err){
            callback(err);
            return;
        }
        client.setSecurity(new soap.WSSecurity(post_data.user, post_data.password));
       // console.log(client);
        client.querymsg(post_data, function(err, result){

            if (!err) {
                callback(result);
            }
            if (err) throw err;
        });
    });

};

module.exports = Soap;
