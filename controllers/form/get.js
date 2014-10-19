var mongoose = require('mongoose');
var Form = require('../../models/form').Form;

var resContent = {
  status: null,
  data: {}
};

module.exports = function(app, req, res) {

  var formID = typeof req.params.formID !== 'undefined' ? req.params.formID : false;

  // get single form
  if (formID) {

    Form.findById(formID, function(e, doc) {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = [doc];
      res.write(JSON.stringify(resContent));
      res.end();
    });

  // get all forms
  } else {

    Form.find({}, function(e, doc) {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = doc;
      res.write(JSON.stringify(resContent));
      res.end();
    })

  }

};
