var express = require('express');
var async = require('async');
var pageUtil = require('../common/pageUtil.js');
var router = express.Router();
var site = require('../common/WebConstant.js');
var topicService = require('../services/topicService.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: site.title });
});

router.get('/item', function(req, res, next) {
    var id = req.query.id;
    var param = {query:{_id:id}};
    topicService.findOne(param,function(err,item){
        if(err){
            console.log(err)
            res.render('error', {message:'查询出错了！'});
            return ;
        }
        if(item){
            res.render('detail/item', { title: site.title,item:item});
        }else{
            res.render('error', { title: site.title,message:'链接不存在'});
        }
    });
});

router.get('/search',function(req, res, next){
  var keyWord = req.query.keyWord;
  var page = parseInt(req.query.page<1 ? 1 : req.query.page, 10) || 1;
  var limit = site.page_count_limit;
  var options = { skip: (page - 1) * limit, limit: limit};
  var param = {query:{search:new RegExp(keyWord)},page:page,options:options};
    async.parallel([
            function(callback){
                topicService.find(param,function(err,topics){
                    if(err){
                        callback(err,null);
                        return ;
                    }
                    callback(null,topics);
                });
            },
            function(callback){
                topicService.count(param,function(err,count){
                    if(err){
                        callback(err,null);
                        return ;
                    }
                    callback(null,count);
                });
            }
        ],
        function(err, results){
            if(err){
                console.log(err);
                res.render('error', {message:'查询出错了！'});
                return ;
            }
            if(results[0].length==0){

            }
            var pages = pageUtil.pageList(page,results[1]);
            var url = "/search?keyWord=" + keyWord +"&page=";
            res.render('items', {title:site.title,items:results[0],keyWord:keyWord,page:page,pages:pages,url:url,count:Math.ceil(results[1]/site.page_count_limit)});
        });
});

router.get('/recommend',function(req, res, next){
    var keyWord = '';
    var page = Math.floor(Math.random()*10+1);
    var limit = site.page_count_limit;
    var options = { skip: (page - 1) * limit, limit: limit};
    var param = {query:{search:new RegExp(keyWord)},page:page,options:options};
    topicService.find(param,function(err,topics){
        if(err){
            return ;
        }
        res.render('recommend', { items:topics});
    });
});

module.exports = router;
