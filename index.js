var config = require('nconf');

config.argv().env().file({
  file: 'config.json'
});

var express = require('express');
// var bodyParser = require('body-parser');
// var fs = require('fs');
var handlebars = require('handlebars');
var mailgun = require('mailgun-js')({
  apiKey: config.get('mailgun:apiKey'),
  domain: config.get('mailgun:domain')
});

var app = express();
// var urlencoded = bodyParser.urlencoded({
//   extended: false
// });
// var source = fs.readFileSync('template.hbs', 'utf8');
// var template = handlebars.compile(source);

app.disable('x-powered-by');
app.listen(3000);

// Create recipient
app.post('/api/v1/recipient', function(req, res) {
  require('./controllers/recipient/post')(app, req, res);
});

// Get recipient
app.get('/api/v1/recipient/:recipientID', function(req, res) {
  console.log(req.params.recipientID);
});

// Create and send message
app.post('/api/v1/message', function(req, res) {
  // require('./controllers/message/post');
});
