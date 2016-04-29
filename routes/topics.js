var express = require('express');
var async = require('async');
var pageUtil = require('../common/pageUtil.js');
var router = express.Router();
var site = require('../common/WebConstant.js');
var topicService = require('../services/topicWrite.js');


router.get('/', function(req, res, next) {
  res.render('console/index', { title: site.title });
});

module.exports = router;
