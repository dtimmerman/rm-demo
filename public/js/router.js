App.Router.map(function() {
  this.resource('index', { path: '/' });
});

App.IndexRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('form').then(function(form) {
      console.log(form);
      // return form;
    });
  }
});
