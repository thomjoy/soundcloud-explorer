define([
  'backbone',
  'templates',
  'v/favouriteitem'
], function(
  Backbone,
  templates,
  FavouriteItem
){
  return Backbone.View.extend({
    tagName: 'ul',
    
    className: 'favourites-period',

    template: templates.favourites,

    events: {
      'mouseenter .fav': 'mouseEnter',
      'mouseleave .fav': 'mouseLeave',
      'mousewheel .fav': 'mouseWheel'
    },

    initialize: function() {
      _.extend(this, this.options);
      this.render();
    },

    render: function() {
      var _this = this;
      
      // remove old nodes
      this.$el.empty();

      // render each of the subviews
      var str = '';
      _.each(this.collection, function(model) {
        var view = new FavouriteItem({ model: model });
        _this.$el.append(view.render());
      });

      return this;
    },

    mouseEnter: _.debounce(function(evt) {
      var $this = $(this);
      $(this).css('opacity', '1');
      $this.find('img').removeClass('bw');
      $('li:not(:hover) img').addClass('bw');
      $('li:not(:hover)').stop().fadeTo('normal', 0.5, function() {
        // Animation complete.
      });
    }, 250, true),

    mouseLeave: function(evt) {
      $(this).find('.duration').removeClass('show');
      $('li:not(:hover) img').removeClass('bw');
      $('li').stop().fadeTo('normal', 1, function() {
        // Animation complete.
      });
    },

    mouseWheel: _.debounce(function(evt) {
      console.log(evt);
      $('li img').removeClass('bw');
    }, 250, true)
  });
});