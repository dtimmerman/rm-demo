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

    // params
    var from = typeof req.body.from !== 'undefined' ? req.body.from : false;
    var to = typeof req.body.to !== 'undefined' ? req.body.to : false;
    var recipientID = typeof req.body.from !== 'undefined' ? req.body.to : false;
    var subject = typeof req.body.subject !== 'undefined' ? req.body.subject : '';
    var body = typeof req.body.body !== 'undefined' ? req.body.body : false;
    var formID = typeof req.body.formID !== 'undefined' ? req.body.formID : false;

    // other vars
    var resContent = {
      status: null,
      data: null
    };

    var validates = true;

    var mailgunOpts;
    var message;

    // validation
    if (!to && !recipientID ) {
      validates = false;
      resContent.data.to = 'Provide either "to" or "recipientID" parameter.';
      resContent.data.recipientID = 'Provide either "to" or "recipientID" parameter.';
    }
    if (!from) {
      validates = false;
      resContent.data.to = 'Missing "to" parameter.';
    }

    // maybe send
    if (!validates) {

      res.writeHead(400);
      resContent.status = 'fail';
      res.write(JSON.stringify(resContent));
      res.end();

    } else {

      body = template({
        name: 'Derek'
      });

      // need async
      if (recipientID) {

      }

      mailgunOpts = {
        from: from,
        to: to,
        subject: subject,
        html: body
      };

      mailgun.messages().send(mailgunOpts, function(error, body) {

        message = new Message({
          from: from,
          to: to,
          recipientID: recipientID,
          subject: subject,
          body: body,
          formID: formID
        });

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
