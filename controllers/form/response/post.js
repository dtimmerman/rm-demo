var async = require('async');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Form = require('../../../models/form').Form;
var FormResponse = require('../../../models/form/response').FormResponse;

var urlencoded = bodyParser.urlencoded({
  extended: false
});

module.exports = function(app, req, res) {

  urlencoded(req, res, function() {

    var formID = typeof req.body.formID !== 'undefined' ? req.body.formID : false;
    var messageID = typeof req.body.messageID !== 'undefined' ? req.body.messageID : false;
    var recipientID = typeof req.body.recipientID !== 'undefined' ? req.body.recipientID : false;
    var recipientEmail = typeof req.body.recipientEmail !== 'undefined' ? req.body.recipientEmail : false;

    var resContent = {
      status: null,
      data: {}
    };
    var validates = true;

    var fields = false;
    var fieldValues = [];
    var form = false;
    var formResponse = false;

    async.series([

      // validation
      function(asyncNext) {

        if (!formID) {
          validates = false;
          resContent.data.name = 'Missing "formID" parameter.';
        }
        if (!messageID) {
          validates = false;
          resContent.data.messageID = 'Missing "messageID" parameter.';
        }
        if (!recipientEmail) {
          validates = false;
          resContent.data.recipientEmail = 'Missing "recipientEmail" parameter.';
        }

        asyncNext();

      },

      // write for invalid response
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

      // load matching form
      function(asyncNext) {

        Form.findById(formID, function(e, doc) {
          form = doc;
          asyncNext();
        });

      },

      // get form fields from form, match values to fields
      function(asyncNext) {

        fields = form.fields;

        for (var key in fields) {

          var field = fields[key];
          var name = field.name;
          var value = typeof req.body[name] !== 'undefined' ? req.body[name] : false;

          if (value) {
            fieldValues.push({
              name: name,
              value: value
            });
          }

        }

        asyncNext();

      },

      // create form response
      function(asyncNext) {

        formResponse = new FormResponse({
          _formID: formID,
          _messageID: messageID,
          _recipientID: recipientID,
          recipientEmail: recipientEmail,
          fieldValues: JSON.stringify(fieldValues)
        });

        formResponse.save();

        res.write('Thank you!')
        res.end();
        asyncNext();

      }

    ]);

  });

};
