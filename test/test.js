/*global describe, it */
'use strict';
var should = require('should');
var Clickatell = require('../index');

describe('node-clickatell node module', function () {
  it('must have required properties', function () {

    var clickatell = new Clickatell({
      mode: 0,//0:http,1:Rest,2:soap, 3:xml,4:com
      user : 'Pedro4D',
      password:'VcCeJWeFaLbAKI',
      auth_token:'e7bKZLmfUgd2.mrmd1umqDgYLeij051Dx_L4_HX1POBJfPTviwHV_Snm9ZT2n',
      api_id : '0a53832f15bb444d8f73a66e3c4ff7a0'
    });

/*

    clickatell.options.should.have.property('user');
    clickatell.options.should.have.property('password');
    clickatell.options.should.have.property('api_id');
*/

    clickatell.sendmsg("test rest",['034617748438'],function(res){
      console.log(res); // ID: 4c640d23a882b331563a2a5dcab258a8
    });

  });
});
