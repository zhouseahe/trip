var request = require('request');
var page = require('../lib/fetchPage.js');
var url ='http://hotel.elong.com/ajax/list/asyncsearch?listRequest.pageIndex=';
var async = require('async');

var tasks = [];
for(var i = 1 ; i<339;i++){
    tasks.push(i);
}
async.mapLimit(tasks, 1, function(item,callback){
    page.findPageItems(url,item,function(err,data){
        if(err){
            callback(err,null);
            return ;
        }
        callback(null,data);
    })
},function(err, results){
    if(err){
        console.log(err);
        return ;
    }
    console.log('success');
});




