var models  = require('../models');
var user = models.user;

module.exports = {
    findOne : function(param,cb){
        user.findOne(param.query,function(err,item){
            if(err){
                cb(err, null);
                return;
            }
            cb(null, item);
        })
    }
}