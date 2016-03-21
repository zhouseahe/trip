var express = require('express');
var router = express.Router();
var site = require('../common/WebConstant.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: site.title });
});

module.exports = router;
