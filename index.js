var express = require('express');
var request = require('request');
var config = require('nconf');

config.argv().env().file({
  file: 'config.json'
});

var mailgun = require('mailgun-js')({
  apiKey: config.get('mailgun:apiKey'),
  domain: config.get('mailgun:domain')
});

var data = {
  from: 'Derek <timmermanderek@gmail.com>',
  to: 'timmermanderek@gmail.com',
  subject: 'Hello',
  text: 'Testing mailgun'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
