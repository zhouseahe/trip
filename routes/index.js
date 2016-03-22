var express = require('express');
var router = express.Router();
var site = require('../common/WebConstant.js');
var topicService = require('../services/topicService.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: site.title });
});

router.get('/search',function(req, res, next){
  var keyWord = req.query.keyWord;
  var page = parseInt(req.query.page, 10) || 1;
  var limit = site.page_count_limit;
  var options = { skip: (page - 1) * limit, limit: limit};
  var param = {query:{title:/[keyWord]/},page:page,options:options};
  topicService.find(param,function(err,topics){
      if(err){
        return ;
      }
      res.render('items', {title:site.title,items:topics,keyWord:keyWord });
  });

});

module.exports = router;
