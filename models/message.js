var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
  from: String,
  to: String,
  recipientID: Schema.Types.Mixed,
  subject: String,
  body: String,
  formID: Schema.Types.Mixed
}, {
  versionKey: false
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = {
  Message: Message
}
