var mongoose = require('mongoose');
var FormResponse = require('../../../models/form/response').FormResponse;

var resContent = {
  status: null,
  data: {}
};

module.exports = function(app, req, res) {

  var responseID = typeof req.params.responseID !== 'undefined' ? req.params.responseID : false;

  // get single response
  if (responseID) {

    FormResponse.findById(responseID, function(e, doc) {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = [doc];
      res.write(JSON.stringify(resContent));
      res.end();
    });

  // get all response
  } else {

    FormResponse.find({}, function(e, doc) {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = doc;
      res.write(JSON.stringify(resContent));
      res.end();
    })

  }

};
