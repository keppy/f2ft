import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  // Only works for two types of hrefs... not flexible
  modalInputValue: computed('modalState', function() {
    return this.get('modalState.action') === 'addVideo' ? this.videoHref : this.imageHref;
  }),

  modalInputValueKey: computed.filter('hrefs', function() {
  }),
  
  actions: {
    setMessage(message, type) {
      this.set(type, message);
      Ember.run.later(( () => {
        this.set(type, null);
      }), 2000);
    }
  }
});
