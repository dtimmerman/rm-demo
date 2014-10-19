var mongoose = require('mongoose');
var fs = require('fs');
var handlebars = require('handlebars');

var FormSchema = new mongoose.Schema({
  name: String,
  fields: {
    type: String,
    get: function(fields) {
      return JSON.parse(fields);
    }
  },
  created: {
    type: Date,
    default: Date.now
  }
});

FormSchema.set('toJSON', { virtuals: true })

FormSchema.virtual('recipientID').get(function() {
  return this._recipientID;
}).set(function(val) {
  this._recipientID = val;
});

FormSchema.virtual('recipientEmail').get(function() {
  return this._recipientEmail;
}).set(function(val) {
  this._recipientEmail = val;
});

FormSchema.virtual('messageID').get(function() {
  return this._messageID;
}).set(function(val) {
  this._messageID = val;
});

FormSchema.virtual('html').get(function() {

  var fields = this.fields;
  var formID = this._id;
  var recipientID = this.recipientID;
  var recipientEmail = this.recipientEmail;
  var messageID = this.messageID;
  var htmlFields = '';

  for (var key in fields) {
    var field = fields[key];
    var fieldHtml = makeFieldHtml(field);
    htmlFields = htmlFields + fieldHtml;
  }

  return makeFormHtml(htmlFields, formID, recipientID, recipientEmail, messageID);

});

function makeFormHtml(fields, formID, recipientID, recipientEmail, messageID) {

  var templateSource = fs.readFileSync('views/form/form.hbs', 'utf8');
  var template = handlebars.compile(templateSource);

  return template({
    action: 'http://localhost:3000/api/v1/form/respond',
    fields: fields,
    formID: formID,
    recipientID: recipientID,
    recipientEmail: recipientEmail,
    messageID: messageID
  });

}

function makeFieldHtml(field) {

  var templateSource = fs.readFileSync('views/form/' + field.type + '.hbs', 'utf8');
  var template = handlebars.compile(templateSource);

  return template({
    name: field.name,
    label: field.label,
    value: field.value
  });

}

var Form = mongoose.model('Form', FormSchema);

module.exports = {
  Form: Form
}
