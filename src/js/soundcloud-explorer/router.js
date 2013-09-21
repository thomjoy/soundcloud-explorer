define(['backbone'], function(Backbone) {
  return Backbone.Router.extend({
    routes: {
      "":              "",
      "likes/:period": "likes"
    },

    initialize: function() {
      console.log('Router active');
    },

    likes: function(period) {
      console.log('likes/' + period);
    }
    
  });
});