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
      this.$el.html(_.template(this.template, {
        period: this.period,
        count: this.count,
      }));

      this.$el.append(this.favouritesListView.$el);
      this.$el.appendTo('#container');
    },
  });
});