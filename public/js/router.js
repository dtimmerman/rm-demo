App.Router.map(function() {
  this.resource('index', { path: '/' });
});

App.IndexRoute = Ember.Route.extend({
  model: function(params) {
    this.store.find('form').then(function(form) {
      // console.log(form);
    });
  }
});
