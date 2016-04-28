// 导入数据
var dataInput = require('../dataImport.js');
var x = './data.xls'
dataInput.execute(x,function(data){
    console.log(data)
});