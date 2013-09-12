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

    fetch: function() {
      return SC.connect(function() {
        SC.get('/me', function(resp) {
          console.log('Got User...');
          window.localStorage.setItem('scUser', JSON.stringify(resp));
          return resp;
        });
      });
    }
  });
});