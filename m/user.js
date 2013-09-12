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
      this.fetch();
    },

    fetch: function() {
      var def = new $.Deferred(),
          _this = this;

      SC.connect(function() {
        SC.get('/me', function(user) {
          _this.set(user);
          def.resolve();
          window.localStorage.setItem('scUser', JSON.stringify(user));
          console.log('User ' + _this.get('permalink') + ' fetched');
        });
      });

      return def.promise();
    }
  });
});