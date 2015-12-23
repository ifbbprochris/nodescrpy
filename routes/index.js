var express = require('express');
var router = express.Router();
var flight = require('../routes/flight')

router.get('/',function(req,res){
	res.send("hello");
});

router.get('/findFlightInfo',flight.getFlightInfo);


module.exports = router;



