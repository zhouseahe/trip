var express = require('express');
var router = express.Router();
var site = require('../common/WebConstant.js');
var topicService = require('../services/topicService.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: site.title });
});

router.get('/search',function(req, res, next){
  var keyWord = req.param('keyWord');
  topicService.find(keyWord,function(err,topics){
      if(err){
        return ;
      }
      res.render('items', {title:site.title,items:topics,keyWord:keyWord });
  });

});

module.exports = router;
