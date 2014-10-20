var async = require('async');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Form = require('../../models/form').Form;

var urlencoded = bodyParser.urlencoded({
  extended: false
});

var resContent = {
  status: null,
  data: {}
};
var validates = true;

var form;
var _fields;

module.exports = function(app, req, res) {

  urlencoded(req, res, function() {

    var name = typeof req.body.name !== 'undefined' ? req.body.name : false;
    var fields = typeof req.body.fields !== 'undefined' ? req.body.fields : false;

    console.log(fields);
    console.log(typeof fields);

    async.series([

      // validation
      function(asyncNext) {

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

      // create form
      function(asyncNext) {

        form = new Form({
          name: name,
          fields: fields
        });

        form.save();

        res.writeHead(200);
        resContent.status = 'success';
        resContent.data = [form];
        res.write(JSON.stringify(resContent));
        res.end();

        asyncNext();

      }

    ]);

  });

};
