var mongoose = require('mongoose');
var FormResponse = require('../../../models/form/response').FormResponse;

module.exports = function(app, req, res) {

  var responseID = typeof req.params.responseID !== 'undefined' ? req.params.responseID : false;
  var formID = typeof req.query.formID !== 'undefined' ? req.query.formID : false;

  var resContent = {
    status: null,
    data: {}
  };

  var query = {};

  if (responseID) {
    query._id = responseID;
  }
  if (formID) {
    query._formID = formID;
  }

  FormResponse.find(query, function(e, doc) {
    console.log(query);
    if (typeof doc !== 'undefined') {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = doc.length > 1 ? doc : [doc];
      res.write(JSON.stringify(resContent));
      res.end();
    } else {
      res.writeHead(200);
      resContent.status = 'fail';
      resContent.message = 'no results';
      res.write(JSON.stringify(resContent));
      res.end();
    }
  })

};
