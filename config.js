/**
 * config
 */

var path = require('path');

var config = {
    // 添加到 html head 中的信息
    site_headers: [
        '<meta name="author" content="EDP@TAOBAO" />'
    ],

    // mongodb 配置
    db: 'mongodb://127.0.0.1:27017/tripstore',

    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,

    session_secret: 'hd_club_secret', // 务必修改
    auth_cookie_name: 'hd_club',

    // 程序运行的端口
    port: 3000,

    // 话题列表显示的话题数量
    search_topic_count: 20,

    // 邮箱配置
    mail_opts: {
        host: 'smtp.126.com',
        port: 25,
        auth: {
            user: 'club@126.com',
            pass: 'club'
        }
    },

    // 文件上传配置
    // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
    upload: {
        path: path.join(__dirname, 'public/upload/'),
        url: '/public/upload/'
    },

    file_limit: '1MB'
};

if (process.env.NODE_ENV === 'test') {
    config.db = 'mongodb://127.0.0.1/node_club_test';
}

module.exports = config;
