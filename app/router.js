import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('writer', function() {
    this.route('article', {path: 'article/:id'});
  });
  this.route('home');
});

export default Router;
