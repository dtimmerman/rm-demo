var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
  from: String,
  to: String,
  recipientID: {},
  subject: String,
  body: String,
  formID: {}
}, {
  versionKey: false
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = {
  Message: Message
}
