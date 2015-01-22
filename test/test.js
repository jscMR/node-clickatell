/*global describe, it */
'use strict';
var should = require('should');
var Clickatell = require('../index');

describe('node-clickatell node module', function () {
  it('must have auth_token property', function () {

    var clickatell = new Clickatell({auth_token : 'W0p2vux4LgskwKRIc76WVUouarRPPfW88giUMYg5fourpk'});

    clickatell.sendSms("hola",['34615131085'],function(res){
      console.log(res);
    });

    clickatell.options.should.have.property('auth_token');
  });
});
