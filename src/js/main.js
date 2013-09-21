define([
  'd3',
  'constants',
  'router',
  'c/favourites',
  'v/favouritelist',
  'v/favouritesection',
  'dateranges',
  'm/user',
  'v/user'
], function(
  d3,
  c,
  Router,
  FavouritesCollection,
  FavouritesListView,
  FavouritesSectionView,
  DateRanges,
  User,
  UserView
){
  
  'use strict';

  var router = new Router(),
      userModel = new User(),
      periodMap = c('periodMap');

  Backbone.history.start({pushState: true});

  $('.loading').html('<div><img src="img/cloud.png" /><span>Loading...</span></div>');

  // kick things off
  $.when( userModel.fetch() ).done(function() {
    $('.loading').hide();
    $('.overlay').removeClass('active').hide();

    var userView = new UserView({
      model: userModel,
    });

    _.keys(periodMap).forEach(function(period) {
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
  });
});