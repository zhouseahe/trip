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
        topic.findOne(param.query,function(err,doc){
            if(err){
                cb(err, null);
                return;
            }
            cb(null, doc);
        })
    },
    insertMany : function(batch,cb){
        topic.insertMany(batch,function(err,docs){
            if(err){
                cb(err, null);
                return;
            }
            cb(null,docs);
        });
    },
    save : function(item,cb){
        topic.create(item, function(err,doc){
            cb(err,doc);
        });
    },
    update: function(item,cb){
        var condition = {_id:item._id};
        topic.update(condition, item , function(err, doc) {
            if(err){
                cb(err, null);
                return;
            }
            cb(null,doc);
        });
    }
}