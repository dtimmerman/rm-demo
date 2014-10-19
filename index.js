var config = require('nconf');
var express = require('express');
var mongoose = require('mongoose');
var app = express();

config.argv().env().file({
  file: 'config.json'
});

mongoose.connect(config.get('mongoose:connectionUrl'));

app.use(express.static(__dirname + '/public'));
app.disable('x-powered-by');
app.listen(3000);

// RECIPIENT

// Get recipient
app.get('/api/v1/recipient/:recipientID?', function(req, res) {
  console.log('GET recipient');
  require('./controllers/recipient/get')(app, req, res);
});

// Create recipient
app.post('/api/v1/recipient', function(req, res) {
  console.log('POST recipient');
  require('./controllers/recipient/post')(app, req, res);
});

// MESSAGE

// Get message
app.get('/api/v1/message/:messageID?', function(req, res) {
  console.log('GET message');
  require('./controllers/message/get')(app, req, res);
});

// Create and send message
app.post('/api/v1/message', function(req, res) {
  console.log('POST message');
  require('./controllers/message/post')(app, req, res);
});

// FORM

// Get form
app.get('/api/v1/form/:formID?', function(req, res, next) {
  console.log('GET form');
  if (typeof req.params.formID !== 'undefined' && req.params.formID === 'response') {
    next();
  } else {
    require('./controllers/form/get')(app, req, res);
  }
});

// Create form
app.post('/api/v1/form', function(req, res) {
  console.log('POST form');
  require('./controllers/form/post')(app, req, res);
});

// Get form response
app.get('/api/v1/form/response/:responseID?', function(req, res) {
  console.log('GET form/response');
  require('./controllers/form/response/get')(app, req, res);
});

// Create form response
app.post('/api/v1/form/response', function(req, res) {
  console.log('POST form/response');
  require('./controllers/form/response/post')(app, req, res);
});

// ADMIN
app.get('/admin', function(req, res) {
  console.log('GET admin');
  require('./controllers/admin/get')(app, req, res);
});

app.all('*', function(req, res) {
  res.writeHead(200);
  res.write('rm-demo nothing matches');
  res.end();
});
