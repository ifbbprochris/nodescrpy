var MyUtil = function () {
};
var http = require('http');
var request = require('request');
var logger = require('./log').logger;
MyUtil.prototype.get=function(url,callback){
request(url, function (error, response, body) {
logger.info("response.statusCode:="+response.statusCode);
if (!error && response.statusCode == 200) {
callback(body,response.statusCode);
}
})
}
module.exports = new MyUtil();