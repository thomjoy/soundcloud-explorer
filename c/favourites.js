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

      return _.filter(this.models, function(m) {
        return fn.call(m.created_at);
      }).sort(sortFn);
    },

    sortAsc: function(a, b) {
      return (new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime());
    },

    sortDesc: function(a, b) {
      return (new Date(b.created_at).getTime()) - (new Date(a.created_at).getTime());
    }
  });

});