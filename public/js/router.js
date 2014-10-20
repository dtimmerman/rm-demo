App.Router.map(function() {
  this.resource('admin', { path: '/admin' });
});

App.AdminRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('form');
  }
});
