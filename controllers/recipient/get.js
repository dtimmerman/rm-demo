var mongoose = require('mongoose');
var Recipient = require('../../models/recipient').Recipient;

module.exports = function(app, req, res) {

  var recipientID = typeof req.params.recipientID !== 'undefined' ? req.params.recipientID : false;

  // get single recipient
  if (recipientID) {
    console.log(recipientID);
  // get all recipients
  } else {
    console.log('all recipients');
  }

  res.end();

};
