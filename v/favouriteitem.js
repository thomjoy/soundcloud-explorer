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

    className: 'fav',

    template: templates.favouriteItem,

    events: {
      '.fav mouseenter': 'mouseEnter',
      '.fav mouseleave': 'mouseLeave'
    },

    initialize: function() {
      _.extend(this, this.options);
    },

    render: function() {
      var templateData = {
        image: this.model.get('artwork_url') ? this.model.get('artwork_url') : this.model.attributes.user.avatar_url,
        tags: this.model.get('tag_list').split(' '),
        date: moment(new Date(this.model.get('created_at'))).format('ddd Do MMM YYYY'),
        duration:  Math.ceil((this.model.get('duration') / 1000) / 60),
        genre: this.model.get('genre') ? this.model.get('genre') : '',
        permalink_url: this.model.get('permalink_url'),
        title: this.model.get('title')
      };

      return this.$el.html(_.template(this.template, templateData));
    },

    mouseEnter: function() {
      var $this = $(this);
      
      _.delay(function() {
        $this.find('.duration').addClass('show');
      }, 250);

      $(this).css('opacity', '1');
      $('li:not(:hover) img').addClass('bw');
      $('li:not(:hover)').stop().fadeTo('normal', 0.5, function() {
        // Animation complete.
      });
    },

    mouseLeave: function() {
      $(this).find('.duration').removeClass('show');
      $('li:not(:hover) img').removeClass('bw');
      $('li').stop().fadeTo('normal', 1, function() {
        // Animation complete.
      });
    }
  });
});