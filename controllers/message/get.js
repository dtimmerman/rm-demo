var mongoose = require('mongoose');
var Message = require('../../models/message').Message;

module.exports = function(app, req, res) {

  var messageID = typeof req.params.messageID !== 'undefined' ? req.params.messageID : false;

  var resContent = {
    status: null,
    data: {}
  };

  var query = {};

  if (messageID) {
    query._id = messageID;
  }

  Message.find(query, function(e, doc) {
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
