var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
// 名称  ， 区域[] （ 景区 ），地址 ， 电话 ， 设施 ， 简介 ，省 ， 搜索
var UserSchema = new Schema({
    title: { type: String },
    area:{ type: String },
    address:{ type: String },
    telephone: { type: String },
    facility:{ type: String },
    content: { type: String },
    province: { type: String },
    search:{type:String},
    name: { type: String },
    distance:{ type: String },
    visit_count: { type: Number, default: 0 },
    call_times:{type:Number , default:0},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    content_is_html: { type: Boolean },
    deleted: {type: Boolean, default: false},
});

UserSchema.plugin(BaseModel);
UserSchema.index({create_at: -1});
UserSchema.index({top: -1, last_reply_at: -1});
UserSchema.index({author_id: 1, create_at: -1});

mongoose.model('user', UserSchema);
