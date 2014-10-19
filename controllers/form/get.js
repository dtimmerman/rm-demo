var mongoose = require('mongoose');
var Form = require('../../models/form').Form;

module.exports = function(app, req, res) {

  var formID = typeof req.params.formID !== 'undefined' ? req.params.formID : false;

  var resContent = {
    status: null,
    data: {}
  };

  // get single message
  if (formID) {

    Form.findById(formID, function(err, doc) {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = [doc];
      res.write(JSON.stringify(resContent));
      res.end();
    });

  // get all messages
  } else {

    Form.find({}, function(err, doc) {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = doc;
      res.write(JSON.stringify(resContent));
      res.end();
    })

  }

};
