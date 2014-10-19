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
}, {
  versionKey: false
});

FormSchema.virtual('recipientID');

FormSchema.virtual('recipientEmail');

FormSchema.virtual('html').get(function() {

  console.log('getting');

  var fields = this.fields;
  var formID = this._id;
  var recipientID = this.recipientID;
  var recipientEmail = this.recipientEmail;
  var htmlFields = '';

  var html;

  console.log(recipientID, typeof recipientID, typeof recipientEmail, recipientEmail);

  for (var key in fields) {
    var field = fields[key];
    var fieldHtml = makeFieldHtml(field);
    htmlFields = htmlFields + fieldHtml;
  }

  return makeFormHtml(htmlFields, formID, recipientID, recipientEmail);

});

function makeFormHtml(fields, formID, recipientID, recipientEmail) {

  var templateSource = fs.readFileSync('views/form/form.hbs', 'utf8');
  var template = handlebars.compile(templateSource);

  return template({
    action: 'http://localhost:3000/api/v1/form/respond',
    fields: fields,
    formID: formID,
    recipientID: recipientID,
    recipientEmail: recipientEmail
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
