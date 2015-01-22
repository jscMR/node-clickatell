/*global describe, it */
'use strict';
var should = require('should');
var Clickatell = require('../index');

describe('node-clickatell node module', function () {
  it('must have required properties', function () {

    var clickatell = new Clickatell({
      user : 'foo',
      password:'bar',
      api_id : '123456'
    });

    clickatell.options.should.have.property('user');
    clickatell.options.should.have.property('password');
    clickatell.options.should.have.property('api_id');
  });
});
