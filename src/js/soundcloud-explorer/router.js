define(['backbone'], function(Backbone) {
  return Backbone.Router.extend({
    routes: {
      "":              "likes",
      "likes":         "likes"
    },

    initialize: function() {
      console.log('Router active');
    },

    likes: function(query) {
      console.log('/likes');
    }
    
  });
});