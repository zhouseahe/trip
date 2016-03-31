var argv = require('yargs').argv;
var dataInput = require('../dataImport.js');

var x = argv.x;
if (!x) {
    console.log('need a filename!');
    process.exit(0);
}

dataInput.execute(x,function(data){
    console.log(data)
});