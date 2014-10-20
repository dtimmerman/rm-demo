var mongoose = require('mongoose');
var Message = require('../../models/message').Message;

var resContent = {
  status: null,
  data: {}
};

module.exports = function(app, req, res) {

  var messageID = typeof req.params.messageID !== 'undefined' ? req.params.messageID : false;

  // get single message
  if (messageID) {

    Message.findById(messageID, function(e, doc) {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = [doc];
      res.write(JSON.stringify(resContent));
      res.end();
    });

  // get all messages
  } else {

    Message.find({}, function(e, doc) {
      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = doc;
      res.write(JSON.stringify(resContent));
      res.end();
    })

  }

};
