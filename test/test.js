/*global describe, it */
'use strict';
var should = require('should');
var Clickatell = require('../index');

describe('node-clickatell node module', function () {
  it('must have required properties', function () {

    var clickatell = new Clickatell({
      mode: 0,//0:http,1:Rest,2:soap, 3:xml,4:com
      user : 'foo',
      password:'bar',
      auth_token:'asdf',
      api_id : 'asdf'
    });

/*

    clickatell.options.should.have.property('user');
    clickatell.options.should.have.property('password');
    clickatell.options.should.have.property('api_id');
*/

    clickatell.sendmsg("test rest",['000'],function(res){
      console.log(res); // ID: 4c640d23a882b331563a2a5dcab258a8
    });

  });
});
