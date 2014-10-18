var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var urlencoded = bodyParser.urlencoded({
  extended: false
});
var Recipient = require('../../models/recipient').Recipient;

module.exports = function(app, req, res) {

  urlencoded(req, res, function() {

    var recipient;

    var name = typeof req.body.name !== 'undefined' ? req.body.name : false;
    var email = typeof req.body.email !== 'undefined' ? req.body.email : false;

    var resContent = {
      status: null,
      data: null
    };

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

      res.writeHead(200);
      resContent.status = 'success';
      resContent.data = recipient;
      res.write(JSON.stringify(resContent));
      res.end();

    }

  });

};
