define([
  'backbone',
  'templates'
], function(
  Backbone,
  templates
) {

  return Backbone.View.extend({

    tagName: 'header',
    className: "navbar navbar-inverse navbar-fixed-top",

    template: templates.header,

    events: {
      'change select': 'handleMenuSelect'
    },

    initialize: function() {
      _.extend(this, this.options);
      this.render();
    },

    render: function() {
      this.$el
        .html(_.template(this.template, { links: this.links, userName: this.user.get('username') || '' }))
        .prependTo('body');
    },

    handleMenuSelect: function(evt) {
      evt.preventDefault();
      var p = evt.currentTarget.value;
      this.vent.trigger('like:periodChange', { period: p, user: this.user });
    }
  });
});