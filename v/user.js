define([
  'backbone',
  'templates'
], function(
  Backbone,
  templates
) {

  return Backbone.View.extend({
    className: 'sc-user',

    template: templates.user,

    initialize: function() {
      _.extend(this, this.options);
      this.listenTo(this.model, 'change', this.render);

      this.render();
    },

    render: function() {
      var templateData = _.extend({}, {
        avatar_url: this.model.get('avatar_url') || '',
        full_name: this.model.get('full_name') || '',
        permalink: this.model.get('permalink') || ''
      });
      this.$el
        .html(_.template(this.template, templateData))
        .appendTo('#user');
    }
  });
});