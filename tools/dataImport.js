var XLSX = require('xlsx');
var topicService = require('../services/topicService.js');
var base = ['A','B','C','D','E','F','G','H']; // 名称 ， 姓名 ，联系电话 ， 地址 ， 景点 ，景点距离 ， 描述

module.exports = {
    execute : function(name,cb){
        var workbook = XLSX.readFile(name);
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        var range = worksheet['!ref'].split(':')[1].replace(/[A-Z]/,'');
        for(var i = 1 ; i <= range ; i++){
            var topic = {title:worksheet[base[0]+i].v,name:worksheet[base[1]+i].v,telephone:worksheet[base[2]+i].v,
            address:worksheet[base[3]+i].v,area:worksheet[base[4]+i].v,distance:worksheet[base[5]+i].v,content:worksheet[base[6]+i].v}
        }
    }
}


