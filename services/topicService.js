var models  = require('../models');
var topic = models.topic;

module.exports = {
    find : function(param,cb) {
        topic.find(param.query,{},param.options,function (err, topics) {
            if (err) {
                cb(err, null);
                return;
            }
            cb(null, topics);
        });
    },
    count: function(param,cb){
        topic.count(param.query,function (err, count) {
            if (err) {
                cb(err, null);
                return;
            }
            cb(null, count);
        });
    },
    findOne : function(param,cb){
        topic.findOne(param.query,function(err,item){
            if(err){
                cb(err, null);
                return;
            }
            cb(null, item);
        })
    }
}