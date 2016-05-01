var site = require("./WebConstant.js");
var countPage = site.count_page;
var pageCount = site.page_count_limit;

exports.pageList = function (page,count) {
    count =  Math.ceil(count/pageCount);
    if(count<=countPage){
        return getPages(1,count);
    }
    if(count - page < countPage/2){
        return getPages(count-countPage +1,count);
    }
    return getPages(page-countPage/2,page + countPage/2 -1);
};

function getPages(start,limit){
    var pageList = [];
    if(start<1){
        start =1 ;
    }
    for(var i=start ; i <= limit; i++){
        pageList.push(i);
    }
    return pageList;
}