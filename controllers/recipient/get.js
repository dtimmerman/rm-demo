var mongoose = require('mongoose');
var Recipient = require('../../models/recipient').Recipient;

module.exports = function(app, req, res) {

  var recipientID = typeof req.params.recipientID !== 'undefined' ? req.params.recipientID : false;

  var resContent = {
    status: null,
    data: null
  };

  // get single recipient
  if (recipientID) {

    Recipient.findById(recipientID, function(err, doc) {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = [doc];
      res.write(JSON.stringify(resContent));
      res.end();
    });

  // get all recipients
  } else {

    Recipient.find({}, function(err, doc) {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = doc;
      res.write(JSON.stringify(resContent));
      res.end();
    })

  }

};
