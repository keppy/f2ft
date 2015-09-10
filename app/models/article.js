import DS from 'ember-data';
import { Model } from 'ember-pouch';

export default Model.extend({
  user: DS.belongsTo('user'),
  title: DS.attr('string', { defaultValue: "" }),
  body: DS.attr('string', { defaultValue: "" }),
  published: DS.attr('boolean', { defaultValue: false })
});
