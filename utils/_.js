var _ = require('underscore');
var util = require('util');
var event = require('events').EventEmitter;

_.version = '0.1.1';

_.event = new event();

// Message logging
_.m = util.log; // With date time
_.c = console.log; // Just logging

_.isInvalid = function(s) {
  return typeof s === 'undefined' || s === null || s === '';
};

// security
var crypto = require('crypto');

_.hash = function(s) {
  return crypto.createHash('sha256').update(s).digest('hex');
};

module.exports = _;