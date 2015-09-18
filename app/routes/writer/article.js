import WriterIndexRoute from './index';

export default WriterIndexRoute.extend({
  templateName: 'writer/index',
  controllerName: 'writer/index',

  model(params) {
    return this.store.findById('article', params.id);
  },

  setupController(controller, model) {
    debugger;
    this._super(controller);
    controller.set('article', model);
  }
});
