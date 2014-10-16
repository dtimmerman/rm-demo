var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
var config = require('nconf');

config.argv().env().file({
  file: 'config.json'
});

var transporter = nodemailer.createTransport(smtpPool({
  port: 25,
  auth: {
    user: config.get('mailgun:smtpOptions:user'),
    pass: config.get('mailgun:smtpOptions:pass')
  },
  maxConnections: 5,
  maxMessages: 10,
  debug: true
}))

var mailOptions = {
  from: config.get('mailgun:mail_options:from'),
  to: 'timmermanderek@gmail.com', // will be dynamic when rest api is in place
  subject: 'foo bar',
  text: 'bar foo'
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log('Error: ' + err);
  }
  else {
    console.log('Response: ' + info);
  }
});
