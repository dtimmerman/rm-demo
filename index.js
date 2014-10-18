var config = require('nconf');
var express = require('express');
var app = express();

config.argv().env().file({
  file: 'config.json'
});

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
  require('./controllers/message/post');
});

// Create form
app.post('/api/v1/form', function(req, res) {

});

// Create form response
app.post('/api/v1/form/:formID', function(req, res) {
  console.log();
});
