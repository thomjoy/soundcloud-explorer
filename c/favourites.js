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

    initialize: function() {
      _.extend(this, this.options);
    },

    getRange: function(filter, sortDir) {
      var fn = DateRanges[filter],
          sortFn = sortDir ? this['sort' + sortDir] : this.sortAsc;
          set = _.filter(this.models, function(m) {
            
            return fn(m.get('created_at'));
          }).sort(sortFn);
      return set;
    },

    today: function() {
      return _.groupBy(this.models, function(m) {
        return DateRanges.today(m.get('created_at'));
      });
    },

    yesterday: function() {
      return _.groupBy(this.models, function(m) {
        return DateRanges.yesterday(m.get('created_at'));
      });
    },

    sortAsc: function(a, b) {
      return (new Date(a.get('created_at')).getTime()) - (new Date(b.get('created_at')).getTime());
    },

    sortDesc: function(a, b) {
      return (new Date(b.get('created_at')).getTime()) - (new Date(a.get('created_at')).getTime());
    }
  });

});