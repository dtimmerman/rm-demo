var mongoose = require("mongoose");

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

FormSchema.virtual('html').get(function() {

  var fields = this.fields;
  var html = '';

  return html;

});

var Form = mongoose.model('Form', FormSchema);

module.exports = {
  Form: Form
}
