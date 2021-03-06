define([
  'soundcloud',
  'backbone',
  'c/favourites',
  'constants'
], function(
  SC,
  Backbone,
  FavouritesCollection,
  c
){

  return Backbone.Model.extend({

    defaults: {
      favourites: null
    },

    fetch: function() {
      var def = new $.Deferred(),
          _this = this,
          favourites = [];

      SC.connect(function() {
        SC.get('/me', function(user) {
          _this.set(user);
          window.localStorage.setItem('scUser', JSON.stringify(user));
          console.log('User ' + _this.get('username') + ' fetched');

          getFaves = function(userId, limit) {
            var i = 0, count = 0,
                pageSize = 200,
                url = '/users/' + userId + '/favorites.json',
                defs = [],
                goGet = function(pageSize, offset, dfd) {
                  SC.get(url, { limit: pageSize, offset: offset }, function(resp) {
                    favourites = favourites.concat(resp);
                    dfd.resolve();
                    // returning from the fn fixed the $.when block
                    return;
                  });
                };

            while( i <= limit ) {
              var d = new $.Deferred();
              goGet(pageSize, i, d);
              defs.push(d.promise());
              i += pageSize;
              count++;
            }

            // return the array of deferreds
            return defs;
          };

          var promises = getFaves(_this.get('id'), _this.get('public_favorites_count'));
          $.when.apply($, promises).done(function() {
            window.localStorage.setItem('favourites', JSON.stringify(favourites));
            _this.set('favourites', new FavouritesCollection());
            _this.get('favourites').reset(favourites);
            console.log(_this.get('favourites').length + ' favourites fetched');

            def.resolve();
          });
        });
      });

      return def.promise();
    }
  });
});