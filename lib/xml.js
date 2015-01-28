'use strict'
var merge = require('util')._extend;
var request = require('request');
var parser = require('xml2json');



function Xml(options){
    this.options = this.getDefaults(options);
}

Xml.prototype.getDefaults = function(options){
    var defaults = {
        mode : 'xml',
        auth_token: null,
        user : null,
        password : null,
        api_id : null,
        api_message_url: 'https://api.clickatell.com/xml/xml'
    };
    return merge(defaults, options);
};

Xml.prototype.sendMsg = function(args,callback){
    this.options.to=args.to;
    this.options.text=args.msg;
    var post_data = this.createMsg(this.options);

    var options = {
        url: this.options.api_message_url+'?data='+post_data,
        headers: {
            "Content-Type": 'application/xml'
        }
    };

    request(options,
        function (error, response, body) {
            if (!error && (response.statusCode >= 200 && response.statusCode <= 206)) {
                var json = JSON.parse(parser.toJson(body));
                if(undefined == json['clickAPI']['sendMsgResp']['apiMsgId']){
                    callback(json['clickAPI']['sendMsgResp']['fault']);
                }else{
                    callback(json['clickAPI']['sendMsgResp']['apiMsgId']);
                }
            }else{
                callback(error);
            }
        }
    );
};

Xml.prototype.queryMsg = function(id_msg,callback){
    this.options.id_msg=id_msg;
    var post_data = this.createQueryMsg(this.options);

    var options = {
        url: this.options.api_message_url+'?data='+post_data,
        headers: {
            "Content-Type": 'application/xml'
        }
    };

    request(options,
        function (error, response, body) {
            if (!error && (response.statusCode >= 200 && response.statusCode <= 206)) {
                var json = JSON.parse(parser.toJson(body));
                console.log(json);
                if(undefined == json['clickAPI']['queryMsgResp']['apiMsgId']){
                    callback(json['clickAPI']['queryMsgResp']['fault']);
                }else{
                    callback(json['clickAPI']['queryMsgResp']['apiMsgId']+' Status '+json['clickAPI']['queryMsgResp']['status']);
                }
            }else{
                callback(error);
            }
        }
    );
};


Xml.prototype.createMsg = function(options){

    var xml = '<?xml version="1.0" encoding="utf-8"?><clickAPI><sendMsg><api_id>'+options.api_id
        +'</api_id><user>'+options.user+'</user><password>'+options.password
        +'</password><to>'+options.to+'</to><text>'+options.text
        +'</text></sendMsg></clickAPI>';
    return xml;
};

Xml.prototype.createQueryMsg = function(options){
    console.log(options);
    var xml = '<?xml version="1.0" encoding="utf-8"?><clickAPI><queryMsg><api_id>'+options.api_id
        +'</api_id><user>'+options.user+'</user><password>'+options.password
        +'</password><apiMsgId>'+options.id_msg+'</apiMsgId>'
        +'</queryMsg></clickAPI>';
    return xml;
};


module.exports = Xml;

