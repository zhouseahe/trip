var models  = require('../models');
var topic = models.topic;

module.exports = {
    find : function(param,cb){
        console.log(param)
        topic.find(param,function(err,topics){
            if(err){
                cb(err,null);
                return ;
            }
            cb(null,topics);
        });
    }
}