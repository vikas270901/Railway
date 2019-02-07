var express = require("express");
var PORT = process.env.PORT;
var app = express();
var request = require("request");
app.set("view engine","ejs");
app.use('/assets', express.static('public'));

app.get("/", function(req, res){
	res.render("index");
	});

app.get("/searchpage", function(req, res){
	res.render("searchpage");
	});

app.get("/runstatuspage", function(req, res){
	res.render("runstatuspage");
	});

app.get("/pnrstatuspage", function(req, res){
	res.render("pnrstatuspage");
	});

app.get("/weatherpage", function(req, res){
	res.render("weatherpage");
	});

app.get("/trainspage", function(req, res){
	res.render("trainspage");
	});

app.get("/namepage", function(req, res){
	res.render("namepage");
	});

app.get("/farepage", function(req, res){
	res.render("farepage");
	});

app.get("/cancelpage", function(req, res){
	res.render("cancelpage");
	});

app.get("/irctc/route", function(req, res){
	var trn = req.query.trainno;
	var url = "https://api.railwayapi.com/v2/route/train/"+trn+"/apikey/tm0omg2cwe";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("page1",{data:data});}
		else{console.log(error);
		res.send(JSON.parse(error));
	}});});

app.get("/irctc/runstatus", function(req, res){
	var trn = req.query.trainno;
	var dat = req.query.date;
	var url = "https://api.railwayapi.com/v2/live/train/"+trn+"/date/"+dat+"/apikey/tm0omg2cwe/";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("page3",{data:data});}
		else{console.log(error);
		res.send(JSON.parse(error));
	}});});

app.get("/irctc/pnrstatus", function(req, res){
	var pnr = req.query.pnr;
	var url = "https://api.railwayapi.com/v2/pnr-status/pnr/"+pnr+"/apikey/tm0omg2cwe/";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("page4",{data:data});}
		else{console.log(error);
		res.send(JSON.parse(error));
	}});});

app.get("/irctc/weather", function(req, res){
	var cty = req.query.city;
	var url = "http://api.openweathermap.org/data/2.5/weather?q="+cty+"&appid=66794f3ab7abcd5f718e5a6769d42db7";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("page2",{data:data});}
		else{console.log(error);
		res.send(JSON.parse(error));
	}});});

app.get("/irctc/trains", function(req, res){
	var src = req.query.src;
	var dest = req.query.dest;
	var date = req.query.date;
	var url = "https://api.railwayapi.com/v2/between/source/"+src+"/dest/"+dest+"/date/"+date+"/apikey/tm0omg2cwe/";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("page5",{data:data});}
		else{console.log(error);
		res.send(JSON.parse(error));
	}});});

app.get("/irctc/name/no", function(req, res){
	var nameno = req.query.nameno;
	var url = "https://api.railwayapi.com/v2/name-number/train/"+nameno+"/apikey/tm0omg2cwe/";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("page6",{data:data});}
		else{console.log(error);
		res.send(JSON.parse(error));
	}});});

app.get("/irctc/fare", function(req, res){
	var train = req.query.train;
	var src = req.query.src;
	var dst = req.query.dst;
	var age = req.query.age;
	var prf = req.query.prf;
	var qota = req.query.qota;
	var date = req.query.date;
	var url = "https://api.railwayapi.com/v2/fare/train/"+train+"/source/"+src+"/dest/"+dst+"/age/"+age+"/pref/"+prf+"/quota/"+qota+"/date/"+date+"/apikey/tm0omg2cwe/";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("page7",{data:data});}
		else{console.log(error);
		res.send(JSON.parse(error));
	}});});

app.get("/irctc/cancel", function(req, res){
	var date = req.query.date;
	var url = "https://api.railwayapi.com/v2/cancelled/date/"+date+"/apikey/tm0omg2cwe/";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("page8",{data:data});}
		else{console.log(error);
		res.send(JSON.parse(error));
	}});});

app.get("/irctc/about", function(req, res){
		res.render("About");
});

app.get("*", function(req, res){
	res.send("Either the site is under maintanence or you entered something wrong (check after '/')");
	});

app.listen(PORT, process.env.IP, function(req, res){
	console.log("Server Started...");
	});
