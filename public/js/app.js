window.App = Ember.Application.create();

DS.RESTAdapter.reopen({
  namespace: 'api/v1'
});

DS.RESTAdapter.reopen({
  host: 'http://localhost:3000'
});

App.ApplicationSerializer = DS.JSONSerializer.extend({

  primaryKey: '_id',

  // not working ??
  /*
  extract: function(store, type, payload, id, requestType) {

    var typeKey = type.typeKey;

    payload[typeKey] = payload.data;
    delete payload.data;

    this.extractMeta(store, type, payload);

    var specificExtract = "extract" + requestType.charAt(0).toUpperCase() + requestType.substr(1);
    return this[specificExtract](store, type, payload, id, requestType);

  }
  */

});
