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
        avatarUrl: this.model.get('avatar_url') || '',
        fullName: this.model.get('full_name') || '',
        username: this.model.get('username') || '',
        favouritesCount: this.model.get('public_favorites_count') || 0
      });
      
      this.$el
        .html(_.template(this.template, templateData))
        .appendTo('#user-sidebar');
    }
  });
});