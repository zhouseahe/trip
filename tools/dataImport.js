var XLSX = require('xlsx');
var topicService = require('../services/topicService.js');
var base = ['A','B','C','D','E','F','G','H']; // 名称  ， 区域[] （ 景区 ），地址 ， 房型[]， 电话 ，联系人 ， 设施 ， 简介 ，省

module.exports = {
    execute : function(name,cb){
        var workbook = XLSX.readFile(name);
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        var range = worksheet['!ref'].split(':')[1].replace(/[A-Z]/,'');
        for(var i = 1 ; i <= range ; i++){
            var topic = {title:worksheet[base[0]+i].v,erea:worksheet[base[1]+i].v,address:worksheet[base[2]+i].v,
                house:worksheet[base[3]+i].v,telephone:worksheet[base[4]+i].v,name:worksheet[base[5]+i].v,
                facility:worksheet[base[6]+i].v,content:worksheet[base[7]+i].v,province:worksheet[base[8]+i].v}
            // insert topic or  insert topics
            console.log(topic)
        }
    }
}


