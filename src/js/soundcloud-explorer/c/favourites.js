define([
  'backbone',
  'm/Favourite',
  'dateranges',
], function(
  Backbone,
  Favourite,
  DateRanges
){
  return Backbone.Collection.extend({

    model: Favourite,

    defaults: {
      userId: 0
    },

    initialize: function() {
      _.extend(this, this.options);
    },

    fetch: function() {
      var _this = this,
          def = new $.Deferred(),
          userId = this.get('userId');

      SC.connect(function() {
        SC.get('/users/' + userId + '/favorites.json?limit=250', function(resp) {
          window.localStorage.setItem('favourites', JSON.stringify(resp));
          _this.reset(resp);
          def.resolve();
        });
      });

      return def.promise();
    },

    getRange: function(filter, sortDir) {
      var fn = DateRanges[filter],
          sortFn = sortDir ? this['sort' + sortDir] : this.sortAsc;
          set = _.filter(this.models, function(m) {
            
            return fn(m.get('created_at'));
          }).sort(sortFn);
      return set;
    },

    sortAsc: function(a, b) {
      return (new Date(a.get('created_at')).getTime()) - (new Date(b.get('created_at')).getTime());
    },

    sortDesc: function(a, b) {
      return (new Date(b.get('created_at')).getTime()) - (new Date(a.get('created_at')).getTime());
    }
  });

});