define([
  'c/favourites',
  'v/favouritelist',
  'v/favouritesection',
  'dateranges',
  'm/user',
  'v/user',
  'constants',
  'soundcloud'
], function(
  FavouritesCollection,
  FavouritesListView,
  FavouritesSectionView,
  DateRanges,
  User,
  UserView,
  c,
  SC
){
  'use strict';

  var userModel = new User(),
      periodMap = c('periodMap');
      
  console.log(c('clientAuth'));

  $('body').append('<div class="loading">Loading...</div>');

  // kick things off
  $.when( userModel.fetch() ).done(function() {
    console.log('All done!');

    $('.loading').hide();
    $('.overlay').removeClass('active');

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