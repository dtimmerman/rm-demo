var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Form = require('../../models/form').Form;

var urlencoded = bodyParser.urlencoded({
  extended: false
});

module.exports = function(app, req, res) {

  urlencoded(req, res, function() {

    var name = typeof req.body.name !== 'undefined' ? req.body.name : false;
    var fields = typeof req.body.fields !== 'undefined' ? req.body.fields : false;

    var resContent = {
      status: null,
      data: {}
    };
    var validates = true;

    async.series([

      // validation
      function(callback) {

        if (!name) {
          validates = false;
          resContent.data.name = 'Missing "name" parameter.';
        }
        if (!fields) {
          validates = false;
          resContent.data.fields = 'Missing "fields" parameter (should be JSON array sent as string).';
        }
        if (fields.length) {
          try {
            JSON.parse(fields);
          } catch(e) {
            validates = false;
            resContent.data.fields = '"fields" parameter should be JSON array sent as string.';
          }
        }

        callback();

      },

      // write for invalid response
      function(callback) {

        if (!validates) {
          res.writeHead(400);
          resContent.status = 'fail';
          res.write(JSON.stringify(resContent));
          res.end();
          callback(true);
        } else {
          callback();
        }

      },

      // create form
      function(callback) {

      }

    ]);

    if (!name || !fields) {

      res.writeHead(400);
      resContent.status = 'fail';
      resContent.data = {};
      if (!name) {
        resContent.data.from = 'Missing "name" parameter.';
      }
      if (!fields) {
        resContent.data.to = 'Missing "fields" parameter (JSON encoded string).';
      }

      res.write(JSON.stringify(resContent));
      res.end();

    } else {

      fields = JSON.parse(fields);
      res.end();

    }

  });

};
