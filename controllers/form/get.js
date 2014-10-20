var mongoose = require('mongoose');
var Form = require('../../models/form').Form;

module.exports = function(app, req, res) {

  var formID = typeof req.params.formID !== 'undefined' ? req.params.formID : false;

  var resContent = {
    status: null,
    data: {}
  };

  var query = {};

  if (formID) {
    query._id = formID;
  }

  Form.find(query, function(e, doc) {
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
