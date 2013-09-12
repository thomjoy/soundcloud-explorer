define([
  'backbone',
  'templates'
], function(
  Backbone,
  templates
) {
  return Backbone.View.extend({

    className: 'favourite-section',

    template: templates.favourites,

    id: function() { return this.options.period + '-container'; },

    events: {

    },

    initialize: function() {
      _.extend(this, this.options);
      this.render();
    },

    render: function() {
      var countString = (function(c) {
        if( c === 0 ) return 'No tracks';
        else if( c === 1 ) return '1 track';
        else return c + ' tracks';
      })(this.count);

      this.$el.html(_.template(this.template, {
        period: this.period,
        count: countString
      }));

      this.$el.append(this.favouritesListView.$el);
      this.$el.appendTo('#container');
    },
  });
});