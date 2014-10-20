var config = require('nconf');
var express = require('express');
var mongoose = require('mongoose');
var app = express();

config.argv().env().file({
  file: 'config.json'
});

mongoose.connect(config.get('mongoose:connectionUrl'));

app.use(express.static(__dirname + '/public'));
app.disable('x-powered-by');
app.listen(3000);

/**
 *  GET recipients
 *
 *  Retrieve a Recipient, which represents a user that can be sent emails and form emails.
 *
 *  Params:
 *  - recipientID: id of Recipient object. Expects string. Required.
 */
app.get('/api/v1/recipients/:recipientID?', function(req, res) {
  console.log('GET recipients');
  require('./controllers/recipient/get')(app, req, res);
});

/**
 *  POST recipients
 *
 *  Create a Recipient.
 *
 *  Params:
 *  - name: name of person. Expects string. Required.
 *  - email: email address of person. Expects string. Required.
 */
app.post('/api/v1/recipients', function(req, res) {
  console.log('POST recipients');
  require('./controllers/recipient/post')(app, req, res);
});

/**
 *  GET messages
 *
 *  Retrieve a Message (email), which represents an email that has been
 *  sent to a Recipient or static email address.
 *
 *  Providing a messageID retrieves that specific Message. Leaving out
 *  the messageID parameter retrieves all Messages.
 *
 *  Params:
 *  - messageID: id of Message object. Expects string. Optional.
 */
app.get('/api/v1/messages/:messageID?', function(req, res) {
  console.log('GET messages');
  require('./controllers/message/get')(app, req, res);
});

/**
 *  POST messages
 *
 *  Create a Message, which will be delivered through Mailgun ASAP.
 *
 *  One can either create a Message with a "to" param value or a
 *  "recipientID" param value. Using "recipientID" is preferred.
 *
 *  In this demo, POST message does not have a body parameter. The
 *  API automatically loads template.hbs for every Message it creates.
 *
 *  In a fully-functioning API, a body parameter would be assumed, or
 *  perhaps a dynamic template loading system (as outlined later in
 *  POST templates).
 *
 *  Params:
 *  - from: email address of message sender. Expects string. Required.
 *  - to: email address of message recipient. Expects string. Semi-optional.
 *  - recipientID: id of Recipient to send Message to. Expects string.
 *    Semi-optional.
 *  - subject: subject line of Message. Expects string. Required.
 *  - formID: id of Form to embed within Message. Expects string.
 */
app.post('/api/v1/messages', function(req, res) {
  console.log('POST messages');
  require('./controllers/message/post')(app, req, res);
});

/**
 *  GET forms
 *
 *  Retrieve a Form.
 *
 *  Providing a formID retrieves that specific Form. Leaving out the
 *  formID parameter retrieves all Forms.
 *
 *  Params:
 *  - formID: id of Form object. Expects string. Optional.
 */
app.get('/api/v1/forms/:formID?', function(req, res, next) {
  console.log('GET forms');
  if (typeof req.params.formID !== 'undefined' && req.params.formID === 'responses') {
    next();
  } else {
    require('./controllers/form/get')(app, req, res);
  }
});

/**
 *  POST forms
 *
 *  Create a Form, which can be embedded within a Message.
 *
 *  For the demo, fields are currently only limited to "text" and
 *  "textarea".
 *
 *  In the future, ideally, fields wouldn't be saved as a JSON string.
 *  This allows for no indexing and searching on it's values. Instead,
 *  the fields of a form could each be saved individually as FormField
 *  objects, each consisting of field name, field label, field type,
 *  and parent Form id.
 *
 *  Params:
 *  - name: name of Form object. Expects string. Required.
 *  - fields: JSON encoded string of form fields. Expects string. Required.
 *    See below for example.
 *
 *  Example fields JSON string:
    [
      {
        "name" : "name",
        "label" : "Your Name",
        "type" : "text"
      },
      {
        "name" : "comments",
        "label" : "Your Comments",
        "type" : "textarea"
      }
    ]
 */
app.post('/api/v1/forms', function(req, res) {
  console.log('POST forms');
  require('./controllers/form/post')(app, req, res);
});

/**
 *  GET forms/responses
 *
 *  Retrieve a FormResponse. A FormResponse consists of values submitted
 *  in response to an emailed Form, plus relevant meta data (id of Recipient
 *  that submitted form, the Message the form was sent within, time, etc).
 *
 *  Providing a responseID retrieves that specific FormResponse. Leaving
 *  out the responseID parameter retrieves all FormResponses.
 *
 *  Params:
 *  - responseID: id of FormResponse object. Expects string. Optional.
 */
app.get('/api/v1/forms/responses/:responseID?', function(req, res) {
  console.log('GET forms/responses');
  require('./controllers/form/response/get')(app, req, res);
});

/**
 *  POST forms/responses
 *
 *  Create a FormResponse.
 *
 *  Params:
 *  -
 */
app.post('/api/v1/forms/responses', function(req, res) {
  console.log('POST forms/responses');
  require('./controllers/form/response/post')(app, req, res);
});

app.get('/', function(req, res) {
  console.log('GET admin');
  require('./controllers/admin/get')(app, req, res);
});

app.all('*', function(req, res) {
  res.writeHead(200);
  res.write('rm-demo nothing matches');
  res.end();
});




// envisioned but not built API endpoints below:

/**
 *  POST forms/fields
 */

/**
 *  GET forms/fields
 */

/**
 *  POST forms/responses/fields
 */

/**
 *  GET forms/responses/fields
 */

/**
 *  POST templates
 */

/**
 *  GET templates
 */
