var config = require('nconf');

config.argv().env().file({
  file: 'config.json'
});

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var handlebars = require('handlebars');
var mailgun = require('mailgun-js')({
  apiKey: config.get('mailgun:apiKey'),
  domain: config.get('mailgun:domain')
});

var app = express();
var urlencoded = bodyParser.urlencoded({
  extended: false
});
var source = fs.readFileSync('template.hbs', 'utf8');
var template = handlebars.compile(source);

app.disable('x-powered-by');
app.listen(3000);

app.post('/api/v1/message', function(req, res) {

  urlencoded(req, res, function() {

    var from = typeof req.body.from !== 'undefined' ? req.body.from : false;
    var to = typeof req.body.from !== 'undefined' ? req.body.to : false;
    var subject = typeof req.body.subject !== 'undefined' ? req.body.subject : '';
    var body = typeof req.body.body !== 'undefined' ? req.body.body : false;

    var resContent = {
      status: null,
      data: null
    };

    var mailgunOpts;

    // INVALID REQUEST
    if (!from || !to || !body) {
      res.writeHead(400);
      resContent.status = 'fail';
      resContent.data = {};
      if (!from) {
        resContent.data.from = 'Missing "from" parameter.';
      }
      if (!to) {
        resContent.data.to = 'Missing "to" parameter.';
      }
      if (!body) {
        resContent.data.body = 'Missing "body" parameter.';
      }
      res.write(JSON.stringify(resContent));
      res.end();

      return;

    }

    // VALID REQUEST

    // although endpoint accepts & expects body param, hard coding
    // body val for now
    body = template({
      name: 'Derek'
    });

    mailgunOpts = {
      from: from,
      to: to,
      subject: subject,
      html: body
    };

    mailgun.messages().send(mailgunOpts, function(error, body) {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = {};
      resContent.data.mailgun = body;
      resContent.data.messageId = '000';
      res.write(JSON.stringify(resContent));
      res.end();
    });

  });

});
