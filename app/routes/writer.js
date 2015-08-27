import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller) {
    let options = JSON.stringify({
      theme: "flat",
      toobar: {
        diffLeft: 25,
        diffTop: 10
      },
      placeholder: false
    });

    controller.setProperties({
      showModal: false,
      modalState: {
        action: '',
        label: '',
        value: '',
        btnText: '',
        title: ''
      },
      body: null,
      articleTitle: 'Article Editor | Editing New Article',
      options: options
    }); 
  },

  actions: {
    toggleImageModal() {
      this.controller.toggleProperty('showModal');
      let show = this.controller.get('showModal');
      if (show) {
        this.controller.setProperties({
          modalState: {
            action: '',
            label: '',
            value: '',
            btnText: '',
            title: ''
          }
        });
      }
    },

    toggleVideoModal() {
      this.controller.toggleProperty('showModal');
      let show = this.controller.get('showModal');
      if (show) {
        this.controller.setProperties({
          modalState: {
            action: 'addVideo',
            label: 'Add Video',
            value: '',
            btnText: '',
            title: ''
          }
        });
      }
    },

    addVideo() {
      let href = this.controller.get('videoHref');
      let hrefSegments = href.split('=').length;
      let normalYoutubeURL = href.split('=')[1];
      let video = null;
      if (hrefSegments === 2) {
        video = `<iframe src="https://www.youtube.com/embed/${normalYoutubeURL}"></iframe>`;
      } else {
        // Probably a youtube iframe already.
        video = href;
      }
      Ember.$('.editable').append(video);
    },

    addImage() {
      let href = this.controller.get('imageHref');
      let image = `<img src="${href}">`;
      Ember.$('.editable').append(image);
    },

    save() {
      let article = {};
      article.body = this.controller.get('body');
      this.store.createRecord('article', article);
    },

    publish() {
      let article = this.controller.get('body');
    }
  }
});
