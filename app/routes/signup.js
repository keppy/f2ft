import Ember from 'ember';
import PouchDB from 'pouchdb';

var remote = new PouchDB('http://localhost:5984/f2ft');

export default Ember.Route.extend({
  actions: {
    submit() {
      let username = this.controller.get('username');
      let work = this.controller.get('work');

      let promise = remote.signup(username, work);
    }
  }
});
