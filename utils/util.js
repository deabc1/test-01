var _ = require('./_');
var fs = require('fs');
var path = require('path');

// Initial config.json at start up
try {
  //_.c(module.parent.filename);
  _.c(__dirname,'****');
  //_.c(path.dirname());
  _.config = JSON.parse(fs.readFileSync(__dirname+'/config.json').toString());
} catch (e) {
  _.m(e);
  _.m('at reading "config.json", startup aborted!');
  process.exit(1);
}

var db = null;
console.log(_.config);

_.db = require('./mysql')(_.config.db);
console.log(_.db);
//_.event.emit('dbready');

module.exports = _;



