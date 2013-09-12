define([
  'soundcloud',
  'backbone'
], function(
  SC,
  Backbone
){

  return Backbone.Model.extend({
    url: function() {
      return '/me';
    },

    initialize: function() {
      _.extend(this, this.options);
    },

    fetch: function() {
      var def = new $.Deferred(),
          _this = this;

      SC.connect(function() {
        SC.get('/me', function(user) {
          window.localStorage.setItem('scUser', JSON.stringify(user));
          _this.set(user);
          def.resolve();
          console.log('User ' + this.get('permalink') + ' fetched');
        });
      });

      return def.promise();
    }
  });
});