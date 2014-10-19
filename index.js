var config = require('nconf');
var express = require('express');
var mongoose = require('mongoose');
var app = express();

config.argv().env().file({
  file: 'config.json'
});

mongoose.connect(config.get('mongoose:connectionUrl'));

app.disable('x-powered-by');
app.listen(3000);

// RECIPIENT

// Get recipient
app.get('/api/v1/recipient/:recipientID?', function(req, res) {
  require('./controllers/recipient/get')(app, req, res);
});

// Create recipient
app.post('/api/v1/recipient', function(req, res) {
  require('./controllers/recipient/post')(app, req, res);
});

// MESSAGE

// Get message
app.get('/api/v1/message/:messageID?', function(req, res) {
  require('./controllers/message/get')(app, req, res);
});

// Create and send message
app.post('/api/v1/message', function(req, res) {
  require('./controllers/message/post')(app, req, res);
});

// FORM

// Get form
app.get('/api/v1/form/:formID?', function(req, res) {
  require('./controllers/form/get')(app, req, res);
});

// Create form
app.post('/api/v1/form', function(req, res) {
  require('./controllers/form/post')(app, req, res);
});

// Get form response
app.get('/api/v1/form/response/:responseID?', function(req, res) {
  require('./controllers/form/response/get')(app, req, res);
});

// Create form response
app.post('/api/v1/form/response', function(req, res) {
  require('./controllers/form/response/post')(app, req, res);
});
