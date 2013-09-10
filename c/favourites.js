define([
  'backbone',
  'm/Favourite'
], function(
  Backbone,
  Favourite
){
  return Backbone.Collection.extend({

    model: Favourite,

    initialize: function() {
      _.extend(this, this.options);
    }

  });

});