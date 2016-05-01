/**
 * config
 */

var path = require('path');

var config = {

    site_headers: [
        '<meta name="author" content="EDP@TAOBAO" />'
    ],
    debug : true,

    db: 'mongodb://127.0.0.1:27017/tripstore',

    user:'leilei',
    auth:'author',

    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,

    session_secret: 'trip_secret',
    auth_cookie_name: 'hd_club',


    port: 3000,

    search_topic_count: 20,

    mail_opts: {
        host: 'smtp.126.com',
        port: 25,
        auth: {
            user: 'club@126.com',
            pass: 'club'
        }
    },

    upload: {
        path: path.join(__dirname, 'public/upload/'),
        url: '/public/upload/'
    },

    file_limit: '1MB'
};

if (process.env.NODE_ENV === 'test') {
    config.db = 'mongodb://127.0.0.1:27017/tripstore';
}

module.exports = config;
