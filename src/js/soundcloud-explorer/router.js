define(['backbone'], function(Backbone) {
  return Backbone.Router.extend({
    routes: {
      "":              "",
      "likes/:period": "likes"
    },

    dashboard: function() {
      console.log('/dashboard');
    },

    likes: function(period) {
      console.log('/likes/' + period);
    }
    
  });
});