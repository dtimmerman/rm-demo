var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
  from: String,
  to: String,
  recipientID: {},
  subject: String,
  body: String,
  formID: {},
  created: {
    type: Date,
    default: Date.now
  }
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = {
  Message: Message
}
