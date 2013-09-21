define([
  'backbone',
  'templates'
], function(
  Backbone,
  templates
) {

  return Backbone.View.extend({

    tagName: 'header',
    className: 'sc-header',

    template: templates.header,

    events: {
      'click a': 'handleMenuClick'
    },

    initialize: function() {
      _.extend(this, this.options);
      this.render();
    },

    render: function() {
      this.$el
        .html(_.template(this.template, { links: this.links }))
        .prependTo('body');
    },

    handleMenuClick: function(evt) {
      evt.preventDefault();
      var link = evt.currentTarget;
      this.vent.trigger('like:periodChange', {
        period: link.href.substr((link.href.lastIndexOf('/') + 1), link.href.length)
      });
    }
  });
});