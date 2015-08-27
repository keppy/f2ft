import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.$('.editable').focus();
  }
});
