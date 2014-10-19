var rendering = require('../rendering')();

module.exports = function(app, req, res) {

  res.writeHead(200);
  res.write(rendering.render('views/admin/index.hbs'));
  res.end();

};
