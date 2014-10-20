Rebelmail.Form = DS.Model.extend({
  name: DS.attr('string'),
  id: DS.attr('string')
});

Rebelmail.Form.Fixtures = [
  {
    name: 'test form name',
    id: '1'
  },
  {
    name: 'another form',
    id: '2'
  }
];
