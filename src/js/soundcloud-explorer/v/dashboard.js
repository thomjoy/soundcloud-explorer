define(['backbone', 'templates'], function(Backbone, templates) {
  return Backbone.View.extend({
    
    className: 'dashboard container',

    template: templates.dashboard,

    events: {

    },

    initialize: function() {
      _.extend(this, this.options);
      this.render();
    },

    render: function() {
      this.$el
        .html(_.template(this.template, this.user.toJSON()))
        .appendTo('#sc-main');
    }
  });
});