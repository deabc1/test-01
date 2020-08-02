var express = require('express');
var router = express.Router();
var _= require('../utils/util');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(_.db);
  res.render('index', { title: 'Express11111' });
});

module.exports = router;
