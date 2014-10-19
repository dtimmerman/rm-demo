var fs = require('fs');
var handlebars = require('handlebars');

function render(templateLocation, data) {

  var templateSource = fs.readFileSync(templateLocation, 'utf8');
  var template = handlebars.compile(templateSource);

  if (typeof data === 'undefined') {
    data = {};
  }

  return template(data);

}

module.exports = function() {
  return {
    render: render
  }
};
