import Ember from 'ember';

export default Ember.Route.extend({

  i18n: Ember.inject.service(),

  setupController(controller) {
    let options = JSON.stringify({
      theme: 'flat',
      toobar: {
        diffLeft: 25,
        diffTop: 10
      },
      placeholder: false
    });

    controller.setProperties({
      errorMessage: null,
      successMessage: null,
      article: null,
      showModal: false,
      modalState: {
        action: '',
        label: '',
        btnText: '',
        title: ''
      },
      body: null,
      videoHref: null,
      imageHref: null,
      articleTitle: this.get('i18n').t('article.header'),
      options: options
    }); 
  },

  /*
   * Uses promise to set success or error message.
   */
  _updateArticle(article, properties) {
    article.setProperties(properties);
    let promise = article.save();
    promise.then( (res) => {
      this.controller.set('article', res);
      this.controller.send('setMessage',
        this.get('i18n').t('article.save.success'),
        'successMessage');
    });
  },

  actions: {
    toggleImageModal() {
      this.controller.toggleProperty('showModal');
      let show = this.controller.get('showModal');
      if (show) {
        this.controller.setProperties({
          modalState: {
            action: 'addImage',
            label: this.get('i18n').t('modal.addImage.title'),
            btnText: this.get('i18n').t('modal.addImage.btnText'),
            title: this.get('i18n').t('modal.addImage.title')
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
            label: this.get('i18n').t('modal.addVideo.title'),
            btnText: this.get('i18n').t('modal.addVideo.btnText'),
            title: this.get('i18n').t('modal.addVideo.title')
          }
        });
      }
    },

    addVideo() {
      let href = this.controller.get('modalInputValue');
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
      let href = this.controller.get('modalInputValue');
      let image = `<img src="${href}">`;
      Ember.$('.editable').append(image);
    },

    save() {
      let body = this.controller.get('body');
      let article = this.controller.get('article');

      if (!body) {
        this.controller.send('setMessage',
          this.get('i18n').t('article.save.error', 'you must supply some text.'),
          'errorMessage');
        return;
      }

      if (article) {
        this._updateArticle(article, {body: body});
      } else {
        let newArticle = this.store.createRecord('article');
        this._updateArticle(newArticle, {body: body});
      }
    },

    publish() {
      let body = this.controller.get('body');
      let article = this.controller.get('article');
      this._updateArticle(article, {published: true});
    }
  }
});
