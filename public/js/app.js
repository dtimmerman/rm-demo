window.App = Ember.Application.create();

DS.RESTAdapter.reopen({
  namespace: 'api/v1'
});

DS.RESTAdapter.reopen({
  host: 'http://localhost:3000'
});

App.ApplicationSerializer = DS.JSONSerializer.extend({

  primaryKey: '_id',

  extract: function(store, type, payload, id, requestType) {

    var typeKey = type.typeKey;

    payload[typeKey] = payload.data;
    delete payload.data;
    console.log(payload);

    console.log(store);

    this.extractMeta(store, type, payload);

    var specificExtract = "extract" + requestType.charAt(0).toUpperCase() + requestType.substr(1);
    console.log(this[specificExtract](store, type, payload, id, requestType));
    return this[specificExtract](store, type, payload, id, requestType);

  }

});
