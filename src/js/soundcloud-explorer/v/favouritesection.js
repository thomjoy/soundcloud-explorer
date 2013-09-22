define([
  'backbone',
  'templates'
], function(
  Backbone,
  templates
) {
  return Backbone.View.extend({

    className: 'favourites-section',

    template: templates.favourites,
    noTracksTemplate: '<h5 class="no-tracks">No tracks</h5>',

    id: function() { return this.options.period.replace(' ', '-').toLowerCase() + '-container'; },

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

      if( this.count > 0 ) {
        this.$el.html(_.template(this.template, {
          period: this.period,
          count: countString
        }));

        this.$el.append(this.favouritesListView.$el).hide();
        $('#sc-main').empty();
        this.$el.appendTo('#sc-main').show();
        this.$el.animate({ top: "+=48" }, 250, function() {
          // Animation complete.
        });
      }
      else {
        $('#sc-main').empty();
        this.$el.html(this.noTracksTemplate);
        this.$el.appendTo('#sc-main').show();
      }
    },
  });
});