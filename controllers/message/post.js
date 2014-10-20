var async = require('async');
var fs = require('fs');
var mongoose = require('mongoose');
var Recipient = require('../../models/recipient').Recipient;
var Message = require('../../models/message').Message;
var Form = require('../../models/form').Form;
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

var resContent = {
  status: null,
  data: {}
};
var validates = true;

var recipient = false;
var message = false;
var form = false;
var body = false;

module.exports = function(app, req, res) {

  urlencoded(req, res, function() {

    var from = typeof req.body.from !== 'undefined' ? req.body.from : false;
    var to = typeof req.body.to !== 'undefined' ? req.body.to : false;
    var recipientID = typeof req.body.recipientID !== 'undefined' ? req.body.recipientID : false;
    var subject = typeof req.body.subject !== 'undefined' ? req.body.subject : '';
    // var body = typeof req.body.body !== 'undefined' ? req.body.body : false;
    var formID = typeof req.body.formID !== 'undefined' ? req.body.formID : false;

    async.series([

      // validation, maybe load recipient
      function(asyncNext) {

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

        asyncNext();

      },

      // maybe load recipient
      // (this and form load could be happening in parallel)
      function(asyncNext) {
        if (recipientID) {
          Recipient.findById(recipientID, function(e, doc) {
            recipient = doc;
            to = recipient.email;
            asyncNext();
          });
        } else {
          asyncNext();
        }

      },

      // maybe load form
      function(asyncNext) {

        if (formID && (recipient || to)) {
          Form.findById(formID, function(e, doc) {
            form = doc;
            form.recipientEmail = to;
            if (recipient) {
              form.recipientID = recipient._id;
            }
            asyncNext();
          })
        } else {
          asyncNext();
        }

      },

      // write for invalid response
      // (this could be moved to async.series complete callback)
      function(asyncNext) {

        if (!validates) {
          res.writeHead(400);
          resContent.status = 'fail';
          res.write(JSON.stringify(resContent));
          res.end();
          asyncNext(true);
        } else {
          asyncNext();
        }

      },

      // create message, pair message with recipient & form
      function(asyncNext) {

        message = new Message({
          from: from,
          to: to,
          recipientID: recipientID,
          subject: subject,
          body: body ? body : '',
          formID: formID
        });

        message.save(function(e, doc) {
          if (form) {
            form.messageID = doc._id;
          }
          asyncNext();
        });

      },

      // re-save message with compiled body html
      function(asyncNext) {

        if (!body) {

          body = template({
            form: form.html
          });
          message.body = body;
          message.save(function(e, doc) {
            asyncNext();
          });

        } else {
          asyncNext();
        }

      },

      // mailgun request
      function(asyncNext) {

        var mailgunOpts = {
          from: from,
          to: to,
          subject: subject,
          html: body
        };

        mailgun.messages().send(mailgunOpts, function(error, body) {
          asyncNext();
        });

      },

      // send response
      function(asyncNext) {

        res.writeHead(200);
        resContent.status = 'success';
        resContent.data = [message];
        res.write(JSON.stringify(resContent));
        res.end();

        asyncNext();

      }

    ]);

  });

};
