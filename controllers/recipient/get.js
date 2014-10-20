var mongoose = require('mongoose');
var Recipient = require('../../models/recipient').Recipient;

module.exports = function(app, req, res) {

  var recipientID = typeof req.params.recipientID !== 'undefined' ? req.params.recipientID : false;

  var resContent = {
    status: null,
    data: {}
  };

  var query = {};

  if (recipientID) {
    query._id = recipientID;
  }

  Recipient.find(query, function(e, doc) {
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
