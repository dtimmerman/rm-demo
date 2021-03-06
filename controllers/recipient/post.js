var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Recipient = require('../../models/recipient').Recipient;

var urlencoded = bodyParser.urlencoded({
  extended: false
});

module.exports = function(app, req, res) {

  urlencoded(req, res, function() {

    var name = typeof req.body.name !== 'undefined' ? req.body.name : false;
    var email = typeof req.body.email !== 'undefined' ? req.body.email : false;

    var resContent = {
      status: null,
      data: null
    };

    var recipient = false;

    if (!name || !email) {

      res.writeHead(400);
      resContent.status = 'fail';
      resContent.data = {};
      if (!from) {
        resContent.data.from = 'Missing "name" parameter.';
      }
      if (!to) {
        resContent.data.to = 'Missing "email" parameter.';
      }
      res.write(JSON.stringify(resContent));
      res.end();

    } else {

      recipient = new Recipient({
        name: name,
        email: email
      });

      recipient.save(function(e, doc) {
        res.writeHead(200);
        resContent.status = 'success';
        resContent.data = [recipient];
        res.write(JSON.stringify(resContent));
        res.end();
      });

    }

  });

};
