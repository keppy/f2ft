import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('article'),
  username:  DS.attr('string'),
  email: DS.attr('string'),
  rev:   DS.attr('string')
});
