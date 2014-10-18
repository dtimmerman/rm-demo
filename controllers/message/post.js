var async = require('async');
var fs = require('fs');
var mongoose = require('mongoose');
var Recipient = require('../../models/recipient').Recipient;
var Message = require('../../models/message').Message;
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
    var recipientID = typeof req.body.recipientID !== 'undefined' ? req.body.recipientID : false;
    var subject = typeof req.body.subject !== 'undefined' ? req.body.subject : '';
    // var body = typeof req.body.body !== 'undefined' ? req.body.body : false;
    var formID = typeof req.body.formID !== 'undefined' ? req.body.formID : false;

    // other vars
    var resContent = {
      status: null,
      data: {}
    };
    var validates = true;
    var recipient = false;
    var message;

    async.series([

      // validation, maybe load recipient
      function(callback) {

        console.log('validation');

        if (!to && !recipientID ) {
          validates = false;
          resContent.data.to = 'Provide either "to" or "recipientID" parameter.';
          resContent.data.recipientID = 'Provide either "to" or "recipientID" parameter.';
        }
        if (!from) {
          validates = false;
          resContent.data.to = 'Missing "to" parameter.';
        }
        if (!subject) {
          validates = false;
          resContent.data.subject = 'Missing "subject" parameter.';
        }

        if (recipientID) {
          Recipient.findById(recipientID, function(err, doc) {
            recipient = doc;
            callback(null);
          });
        } else {
          callback(null);
        }

      },

      // write for invalid response
      function(callback) {

        console.log('invalid response');

        if (!validates) {
          console.log('doesnt validate');
          res.writeHead(400);
          resContent.status = 'fail';
          res.write(JSON.stringify(resContent));
          res.end();
          callback(true);
        } else {
          callback();
        }

      },

      // mailgun request
      function(callback) {

        console.log('mailgun');

        var body = template({
          name: 'Personname'
        });

        if (recipient) {
          to = recipient.email;
        }
        var mailgunOpts = {
          from: from,
          to: to,
          subject: subject,
          html: body
        };

        mailgun.messages().send(mailgunOpts, function(error, body) {
          callback();
        });

      },

      // save message
      function(callback) {

        console.log('save message');

        message = new Message({
          from: from,
          to: to,
          recipientID: recipientID,
          subject: subject,
          body: body,
          formID: formID
        });

        message.save();

      },

      // send response
      function(callback) {

        console.log('client response');

        res.writeHead(200);
        resContent.status = 'success';
        resContent.data = [message];
        res.write(JSON.stringify(resContent));
        res.end();

      }

    ]);

  });

};
