import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

var remote = new PouchDB('http://localhost:5984/f2ft');
var db = new PouchDB('f2ft');

db.sync(remote, {
  live: true,   // do a live, ongoing sync
  retry: true   // retry if the conection is lost
});

PouchDB.debug.enable('*');

export default Adapter.extend({
  db: db
});
