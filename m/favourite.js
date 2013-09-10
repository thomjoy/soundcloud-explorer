define(['backbone'], function(Backbone) {

  return Backbone.Model.extend({

    initialize: function() {
      _.extend(this, this.options);
    }

  });

});