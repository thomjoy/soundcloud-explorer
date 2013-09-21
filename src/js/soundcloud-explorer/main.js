// Break out the application running from the configuration definition to
// assist with testing.
require(["config"], function() {

  // Kick off the application.
  require(["app/app", "router"], function(App, Router) {
    var app = new App({
      router: new Router,
      vent: _.extend({}, Backbone.Events)
    });

    

    // load the app
    //app.vent.trigger('app:boot', function(){
    //
    //});

    app.dashboard();

    // attach events
    app.vent.on('like:periodChange', function(data) {
      app.likes({ 
        period: data.period,
        user: data.user
      });
      
      app.router.navigate('/likes/' + data.period, {trigger: true});
    });
  });
});
