App.Router.map(function() {
  this.resource('index', { path: '/' });
});

App.IndexRoute = Ember.Route.extend({
  model: function(params) {
    /*
    return this.store.find('form').then(function(form) {
    });
    */
    var models = null;
    var url = 'http://localhost:3000/api/v1/form';
    return Ember.$.getJSON(url).then(function(data) {
      console.log(data.data);
      return data.data;
    });
  }
});
