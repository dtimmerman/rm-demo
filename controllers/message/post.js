var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('nconf');
var handlebars = require('handlebars');
var mailgun = require('mailgun-js')({
  apiKey: config.get('mailgun:apiKey'),
  domain: config.get('mailgun:domain')
});

var urlencoded = bodyParser.urlencoded({
  extended: false
});

var templateSource = fs.readFileSync('template.hbs', 'utf8');
var template = handlebars.compile(templateSource);

module.exports = function(app, req, res) {

  urlencoded(req, res, function() {

    var from = typeof req.body.from !== 'undefined' ? req.body.from : false;
    var recipientID = typeof req.body.from !== 'undefined' ? req.body.to : false;
    var subject = typeof req.body.subject !== 'undefined' ? req.body.subject : '';
    var body = typeof req.body.body !== 'undefined' ? req.body.body : false;

    var resContent = {
      status: null,
      data: null
    };

    var mailgunOpts;

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

    } else {

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

    }

  });

};