
/**
 * Module dependencies.
 */

var express = require('express'),
	app = module.exports = express.createServer(),
	mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://localhost/emails'),
	Schema = mongoose.Schema,
	
	// Email Schema
	Email = new Schema({
		email	: String,
	});

// db stuff
EmailModel = mongoose.model('Email', Email);


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
app.get('/work', function(req, res){
  res.render('work', {
    title: 'VentureCurious'
  });
});
app.post('/signedUp', function(req, res){
  if(req.param.length < 2500 ){
	  var insertEmail = new EmailModel({ email:req.param('email') });
	  insertEmail.save(function(err){
		if (err) { console.log(err); }
	  });
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
