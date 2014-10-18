var mongoose = require("mongoose");

var RecipientSchema = new mongoose.Schema({
  name: String,
  email: String
}, {
  versionKey: false
});

var Recipient = mongoose.model('Recipient', RecipientSchema);

module.exports = {
  Recipient: Recipient
}
