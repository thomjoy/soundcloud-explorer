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

  return function(opts) {
    return _.extend({
      dashboard: function() {
        var userModel = new User(),
            periodMap = c('periodMap'),
            vent = this.vent;
        
        Backbone.history.start({pushState: true});
        
        $('.loading').html('<div><img src="../img/cloud.png" /><span>Loading...</span></div>');

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
            user: userModel
          });

          var dashboardView = new DashboardView({
            user: userModel
          });
        });
      },

      likes: function(opts) {
        
        var periodMap = c('periodMap');

        console.log(opts);

        if( opts.period === 'everything' ) {
          _.keys(periodMap).forEach(function(period) {
            var slice = opts.user.get('favourites').getRange(period, 'Desc'),
                favouritesView = new FavouritesSectionView({
                  period: periodMap[period],
                  count: slice.length,
                  total: opts.user.get('favourites').length,
                  favouritesListView: new FavouritesListView({
                    collection: slice
                  })
                });
          });
        }
        else {
          var slice = opts.user.get('favourites').getRange(opts.period, 'Desc'),
              favouritesView = new FavouritesSectionView({
                period: periodMap[opts.period],
                count: slice.length,
                total: opts.user.get('favourites').length,
                favouritesListView: new FavouritesListView({
                  collection: slice
                })
              });
        }
      },

      trends: function() {
        console.log('app.trends');
      }
    }, opts);
  };
});