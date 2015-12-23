var redis = require('redis');
var client = redis.createClient('6379','127.0.0.1');
var logger = require('./log').logger;

var MyRedis = function () {
};

client.on("error",function(err){
	logger.info("Error" + err);
});

client.on("connect",function(err,info){
	logger.info("redis connected success listen on 127.0.0.1:6379");
});

MyRedis.prototype.getFlightInfo = function(flightnumber,callback) {
	//get a value
	client.get(flightnumber,function(error,reply){
		callback(error,reply);
	});
}

MyRedis.prototype.setFlightInfo = function(flightnumber,flightinfo) {
	// set a value
	client.set(flightnumber,flightinfo,function(error,reply){
		debugger;
		logger.info("repy from redis set a value" + reply);
	})
}

module.exports = new MyRedis();