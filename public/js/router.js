Rebelmail.Router.map(function() {
  this.resource('forms', { path: '/admin' });
});

Rebelmail.FormsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('form');
  }
});
