var myUtil = require('../myUtil.js');
var myRedis = require('../myRedis');
var cheerio = require('cheerio');
var bodyParser = require("body-parser"); 
var logger = require('../log').logger;

function getFlightInfo(req,res){
	var flightnumber = req.query.flightnumber;
		//get a value
		myRedis.getFlightInfo(flightnumber,function(error,reply){
			
			if(reply !== null){
				
				var item = JSON.parse(reply.toString());
				res.send(item);
			}else{
				var url="http://flight.qunar.com/status/fquery.jsp?flightCode="+flightnumber;
				myUtil.get(url,function(content,status){
	
					var item = Machining(content);

					var str = JSON.stringify(item);
					//set a new value
					myRedis.setFlightInfo(flightnumber,str);

					res.send(item);
				});
			}
		});

}

function Machining(content){
	//解析成jQuery
	var $ = cheerio.load(content);
	//时间
	var time = $('.state_list').find('li').first().find('.ctime2').text().trim();
	var depart_time = time.substr(0,5);
	var arrival_time = time.substr(5,time.length);

	var first = $('.hotel_introduce').find('h2').first().text().trim();
	var last = $('.hotel_introduce').find('h2').last().text().trim();

	//城市
	var depart_city = first.substr(0,first.length - 2);
	var arrival_city = last.substr(0,last.length - 2)

	//航空公司
	var flightcompany = $('.state_detail').find('dt').text().trim();
	var startindex = flightcompany.indexOf("(");
	var flight_company = flightcompany.substring(startindex + 1,flightcompany.length - 1);

	//机型
	var flight_style = $('.state_list').find('li').first().find('.ctime4').text().trim();

	var item = {
		depart_time:depart_time,
 		arrival_time:arrival_time,
 		depart_city:depart_city,
 		arrival_city:arrival_city,
 		flight_style:flight_style,
 		flight_company:flight_company
	}

 	logger.info(item);
	return item;
}

exports.getFlightInfo = getFlightInfo;