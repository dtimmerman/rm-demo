var mongoose = require("mongoose");

var RecipientSchema = new mongoose.Schema({
  name: String,
  email: String,
  created: {
    type: Date,
    default: Date.now
  }
});

var Recipient = mongoose.model('Recipient', RecipientSchema);

module.exports = {
  Recipient: Recipient
}
