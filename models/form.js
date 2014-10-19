var mongoose = require("mongoose");

var FormSchema = new mongoose.Schema({
  name: String,
  fields: String, // expect json
  html: String,
  created: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

var Form = mongoose.model('Form', FormSchema);

module.exports = {
  Form: Form
}
