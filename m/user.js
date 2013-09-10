define([
  'soundcloud',
  'backbone'
], function(
  SC,
  Backbone
){

  return Backbone.Model.extend({
    url: function() {
      return SC.get('/me', function(me) { console.log(me); });
    },

    initialize: function() {
      _.extend(this, this.options);
    },

    getFavourites: function() {
      return SC.get('/users/' + me.id + '/favorites.json?limit=500', function(resp) {
        console.log('Got Faves...');
        window.localStorage.setItem('favourites', JSON.stringify(resp));
        return resp;
      });
    }
  });
});