define([
  'd3',
  'constants',
  'router',
  'c/favourites',
  'v/favouritelist',
  'v/favouritesection',
  'dateranges',
  'm/user',
  'v/user',
  'v/header',
  'v/dashboard'
], function(
  d3,
  c,
  Router,
  FavouritesCollection,
  FavouritesListView,
  FavouritesSectionView,
  DateRanges,
  User,
  UserView,
  HeaderView,
  DashboardView
){
  
  'use strict';

  var router = new Router(),
      userModel = new User(),
      periodMap = c('periodMap'),
      vent =  _.extend({}, Backbone.Events);

  Backbone.history.start({pushState: true});

  $('.loading').html('<div><img src="img/cloud.png" /><span>Loading...</span></div>');

  // kick things off
  $.when( userModel.fetch() ).done(function() {
    $('.loading').hide();
    $('.overlay').removeClass('active').hide();

    var userView = new UserView({
      model: userModel,
    });

    var headerView = new HeaderView({
      links: (function(periods) {
        return _.map(_.extend(periods, {"everything": "Everything"}), function(val, key, list) {
          return { value: key.toLowerCase(), text: val };
        });
      })(c('periodMap')),
      vent: vent,
      userName: userModel.get('username') || 'tomjoy_'
    });

    var dashboardView = new DashboardView({
      user: userModel
    });

    /*_.keys(periodMap).forEach(function(period) {
      var slice = userModel.get('favourites').getRange(period, 'Desc'),
          favouritesView = new FavouritesSectionView({
            period: periodMap[period],
            count: slice.length,
            total: userModel.get('favourites').length,
            favouritesListView: new FavouritesListView({
              collection: slice
            })
          });
    });
    */
  });

  vent.on('like:periodChange', function(data) {
    router.navigate('/likes/' + data.period, {trigger: true});
  });

});