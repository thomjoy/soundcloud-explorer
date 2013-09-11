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

    events: { },

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
    }
  });
});