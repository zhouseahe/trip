var request = require('request');
var cheerio = require("cheerio");
var itemUrl = 'http://hotel.elong.com/beijing/';
var async = require('async');
var topicService = require('../../services/topicService.js');

module.exports = {
    findPageItems:function(url,index,cb){
        request({
            method: 'get',
            url: url + index,
            form: ''
        }, function(err, resp, body) {
            if (err) {
                console.log(err);
                cb(err,null);
                return;
            }
            var result = JSON.parse(body).value.hotelIds;
            console.log('start index : ' + index + ' ids : ' + result);
            var items = result.split(',');
            console.log(items.length);
            async.mapLimit(items, 1, function(item,callback){
                request({
                    method: 'get',
                    url:itemUrl + item ,
                    form:''
                }, function(err, resp, body) {
                    if (err) {
                        callback(err,null);
                        return;
                    }
                    var topic = parseItem(body);
                    callback(null,topic);
                });
            },function(err, results){
                if(err){
                    console.log(err);
                    cb(err,null);
                    return ;
                }
                topicService.insertMany(results,function(err,data){
                    if(err){
                        console.log(err);
                        return ;
                    }
                    console.log('finish index : ' + index + ' ids : ' + result);
                    cb(null,null);
                })
            });
        });
    }
}

//var base = ['A','B','C','D','E','F','G','H']; // 名称  ， 区域[] （ 景区 ），地址 ， 电话 ， 设施 ， 简介 ，省 ， 搜索
function parseItem(body){
    $ = cheerio.load(body);
    var mix = $('.clearfix .mr5');
    var position = mix.text().split(']');
    var full = $('.dview_info .dview_info_item');

    var title = $('div .yahei').attr('title');
    var area = position[0].replace('[','');
    var address =position[1];
    var telephone = '', facility = '', content= '';
    try{
        telephone = full[0].children[3].children[0].data;
        facility = full[4].children[3].children[3].children[0].data;
        content = full[5].children[3].children[3].children[0].data;
    }catch(ex){

    }
    var province = '北京';
    var search = title +  area;
    var topic = {title:title,area:area , address : address , telephone:telephone ,
        facility:facility, content: content ,province : province , search : search};
    //console.log(topic);
    return topic;
}
