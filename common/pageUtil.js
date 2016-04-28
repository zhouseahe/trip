var site = require("./WebConstant.js");
var countPage = site.count_page;
var pageCount = site.page_count_limit;

exports.pageList = function (page,count) {
    count =  Math.ceil(count/pageCount);
    if(count<=countPage || page < countPage){
        return getPages(1,countPage);
    }
    if(count - page < countPage){
        return getPages(count-countPage +1,count);
    }
    return getPages(page-countPage/2,page + countPage/2 -1);
};

function getPages(start,limit){
    var pageList = [];
    for(var i=start ; i <= limit; i++){
        pageList.push(i);
    }
    return pageList;
}