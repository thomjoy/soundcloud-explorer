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
      '.fav mouseenter': 'mouseEnter',
      '.fav mouseleave': 'mouseLeave'
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

    mouseEnter: function(evt) {
      var $this = $(this);
      console.log(evt);
      _.delay(function() {
        $this.find('.duration').addClass('show');
      }, 250);

      $(this).css('opacity', '1');
      $('li:not(:hover) img').addClass('bw');
      $('li:not(:hover)').stop().fadeTo('normal', 0.5, function() {
        // Animation complete.
      });
    },

    mouseLeave: function(evt) {
      console.log(evt);
      $(this).find('.duration').removeClass('show');
      $('li:not(:hover) img').removeClass('bw');
      $('li').stop().fadeTo('normal', 1, function() {
        // Animation complete.
      });
    }
  });
});