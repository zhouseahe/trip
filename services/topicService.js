var models  = require('../models');
var topic = models.topic;

module.exports = {
    find : function(param,cb) {
        topic.find({title: /[param]/},function (err, topics) {
            if (err) {
                cb(err, null);
                return;
            }
            cb(null, topics);
        });
    }
}