import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

var remote = new PouchDB('http://localhost:5984/f2ft');
var db = new PouchDB('local_pouch');

db.sync(remote, {
  live: true,   // do a live, ongoing sync
  retry: true   // retry if the conection is lost
});

export default Adapter.extend({
  db: db
});
