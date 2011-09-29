
/**
 * Module dependencies.
 */

var express = require('express'),
	app = module.exports = express.createServer(),
	yelp = require('yelp').createClient({
		consumer_key: "7Ik7dpdVGrbMD52sIXKxWw",
		consumer_secret: "Jl3_O3ht-TExXSYfFpIZb1dfCn8",
		token: "7Z298ZYsMMnl5VgeZreG2ZKioeFtShAt",
		token_secret: "EjVgHs_oQiRH8VuHoPACZNcgMrM"
	});
/*	mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://localhost/emails'),
	Schema = mongoose.Schema,
	
	// Email Schema
	Email = new Schema({
		email	: String,
	});

// db stuff
EmailModel = mongoose.model('Email', Email);*/


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'VentureCurious'
  });
});
app.get('/about', function(req, res){
  res.render('about', {
    title: 'VentureCurious'
  });
});
app.get('/beta', function(req, res){
  res.render('beta', {
  	title: 'VentureCurious'
  });
});
app.post('/betaSearch', function(req, res){
	
  	yelp.search({term:req.param('keywords'), location:req.param('dest')}, function(error, data) {
		if(error){console.log(error);}
		
		// Do algorithm to pick certain amount from each category
		// and put into a JSON object..
		// Need to think about how I pass that to the front end calendar...
		
		if(data.businesses.length > 0){
			var listings = "Business #"+0+"<br/>"
			listings +="================"+"<br/>"
			listings +=data.businesses[0].name +"<br/><br/>";
			
			for(var i=1; i<data.businesses.length; i++){
				listings += "Business #"+i+"<br/>"
				listings +="================"+"<br/>"
				listings +=data.businesses[i].name +"<br/><br/>";
			}
			res.send(listings);
		}
  	});
});
app.get('/work', function(req, res){
  res.render('work', {
    title: 'VentureCurious'
  });
});
app.post('/signedUp', function(req, res){
  if(req.param.length < 2500 ){
	  /*var insertEmail = new EmailModel({ email:req.param('email') });
	  insertEmail.save(function(err){
		if (err) { console.log(err); }
	  });*/
  }
  res.render('signedUp', {
    title: 'VentureCurious'
  });
  // EmailModel.find({}, function(err, emails) {
	// emails.forEach(function(email){
		// console.log(email.email);
	// });
  // });
});

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
