var express = require('express');
var pageUtil = require('../common/pageUtil.js');
var router = express.Router();
var site = require('../common/WebConstant.js');
var config   = require('../config');
var topicService = require('../services/topicService.js');
var topicWrite = require('../services/topicWrite.js');
var async = require('async');

router.get('/item', function(req, res, next) {
  var id = req.query.id;
  if(!id){
    res.render('console/form', {item:{}});
    return ;
  }
  var param = {query:{_id:id}};
  topicService.findOne(param,function(err,item){
    if(err){
      console.log(err)
      res.render('error', {message:'查询出错了！'});
      return ;
    }
    if(item){
      res.render('console/form', {item:item});
    }else{
      res.render('error', {message:'数据不存在'});
    }
  });
});

router.post('/item', function(req, res, next) {
  var id = req.body.id;
  var title = req.body.title;
  var area =  req.body.area;
  var telephone =  req.body.telephone;
  var address =  req.body.address;
  var facility =  req.body.facility;
  var province =  req.body.province;
  var content =  req.body.content;
  var search = title + area;
  var item = {title:title,area:area,telephone:telephone,address:address,facility:facility,
    province:province,content:content,search:search};
  if(id){
    item['id'] = id ;
  }
  if(item.id){
    topicWrite.update(item,function(err,doc){
      if(err){
        console.log(err);
        res.render('error', {message:'提交出错了！'});
        return ;
      }
      res.render('console/view', {item:doc});
    });
  }else{
    topicWrite.save(item,function(err,doc){
      if(err){
        console.log(err);
        res.render('error', {message:'提交出错了！'});
        return ;
      }
      res.render('console/view', {item:doc});
    });
  }
});

router.get('/list', function(req, res, next) {
  if(req.session.user){
    var keyWord = req.query.keyWord;
    var telephone = req.query.telephone;
    if(keyWord||telephone){
      var page = parseInt(req.query.page||1);
      var limit = site.page_count_limit;
      var options = { skip: (page - 1) * limit, limit: limit};
      var param = '';
      if(keyWord && !telephone){
        param = {query:{search:new RegExp(keyWord)},page:page,options:options};
      }else if(!keyWord && telephone){
        param = {query:{telephone:new RegExp(telephone)},page:page,options:options};
      }else{
        param = {query:{search:new RegExp(keyWord),telephone:telephone},page:page,options:options};
      }
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
            var pages = pageUtil.pageList(page,results[1]);
            res.render('console/list', {items:results[0],keyWord:keyWord,telephone:telephone,page:page,pages:pages,count:Math.ceil(results[1]/site.page_count_limit)});
          });
    }else{
      res.render('console/list', {keyWord:'',telephone:'', items: []});
      return ;
    }
  }else{
    res.render('console/login', { title: site.title });
  }
});


router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('console/index', { title: site.title });
  }else{
    res.render('console/login', { title: site.title });
  }
});

router.post('/login', function(req, res, next) {
  var name = req.body.name;
  var password = req.body.password;
  if(config.user==name && config.auth==password){
    req.session.user = {admin:1};
    res.render('console/index', { title: site.title });
  }else{
    res.render('console/login', { title: site.title});
  }
});

router.get('/logout', function(req, res, next) {
  delete req.session.user;
  res.render('console/login', { title: site.title});
});

module.exports = router;
