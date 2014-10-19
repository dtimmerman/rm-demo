var mongoose = require('mongoose');

var FormResponseSchema = new mongoose.Schema({
  _formID: mongoose.Schema.Types.ObjectId,
  _recipientID: {},
  recipientEmail: {},
  fieldValues: {
    type: String,
    get: function(fieldValues) {
      return JSON.parse(fieldValues);
    }
  },
  created: {
    type: Date,
    default: Date.now
  }
});

var FormResponse = mongoose.model('FormResponse', FormResponseSchema);

module.exports = {
  FormResponse: FormResponse
}
