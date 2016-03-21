/**
 * config
 */

var path = require('path');

var config = {
    // ��ӵ� html head �е���Ϣ
    site_headers: [
        '<meta name="author" content="EDP@TAOBAO" />'
    ],

    // mongodb ����
    db: 'mongodb://127.0.0.1:27017/tripstore',

    // redis ���ã�Ĭ���Ǳ���
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,

    session_secret: 'hd_club_secret', // ����޸�
    auth_cookie_name: 'hd_club',

    // �������еĶ˿�
    port: 3000,

    // �����б���ʾ�Ļ�������
    search_topic_count: 20,

    // ��������
    mail_opts: {
        host: 'smtp.126.com',
        port: 25,
        auth: {
            user: 'club@126.com',
            pass: 'club'
        }
    },

    // �ļ��ϴ�����
    // ע�������д qn_access������ϴ��� 7ţ������������Ч
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
