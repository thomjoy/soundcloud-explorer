define([
  'backbone',
  'templates',
  'moment',
], function(
  Backbone,
  templates,
  moment
) {
  return Backbone.View.extend({
    
    tagName: 'li',

    className: 'faves',

    template: templates.favouriteItem,

    events: {},

    initialize: function() {
      _.extend(this, this.options);
    },

    render: function() {
      var templateData = {
        image: this.model.get('artwork_url') ? this.model.get('artwork_url') : this.model.get('user.avatar_url'),
        tags: this.model.get('tag_list').split(' '),
        date: moment(new Date(this.model.get('created_at'))).format('ddd Do MMM YYYY'),
        duration:  Math.ceil((this.model.get('duration') / 1000) / 60),
        genre: this.model.get('genre') ? this.model.get('genre') : '',
        permalink_url: this.model.get('permalink_url'),
        title: this.model.get('title')
      };

      return this.$el.html(_.template(this.template, templateData));
    },
  });
});