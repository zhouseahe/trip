var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var TopicSchema = new Schema({
    title: { type: String },
    content: { type: String },
    name: { type: String },
    telephone: { type: Number },
    province: { type: String },
    address:{ type: String },
    area:{ type: Object },
    distance:{ type: String },
    visit_count: { type: Number, default: 0 },
    call_times:{type:Number , default:0},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    content_is_html: { type: Boolean },
    deleted: {type: Boolean, default: false},
});

TopicSchema.plugin(BaseModel);
TopicSchema.index({create_at: -1});
TopicSchema.index({top: -1, last_reply_at: -1});
TopicSchema.index({author_id: 1, create_at: -1});

mongoose.model('topic', TopicSchema);
