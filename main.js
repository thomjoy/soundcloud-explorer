// app.js
define([
  'c/favourites',
  'v/favouritelist',
  'v/favouritesection',
  'dateranges',
  'm/user',
  'v/user',
  'soundcloud'
], function(
  FavouritesCollection,
  FavouritesListView,
  FavouritesSectionView,
  DateRanges,
  User,
  UserView,
  SC
){
  'use strict';

  //var favourites = JSON.parse(window.localStorage.getItem('favourites')),
  //    favCollection = new FavouritesCollection(favourites);

  // @todo: fix this, should be in the collection.
  // Backbone.offline?
  
  /*
  if( !favourites ) {
    SC.initialize({
      client_id: '9d440de30aed58dd6f5d2ecd754ab5a6',
      redirect_uri: 'http://localhost:9999/callback.html'
    });
    SC.connect(function() {
      SC.get('/me', function(me) {
        SC.get('/users/' + me.id + '/favorites.json?limit=500', function(resp) {
          window.localStorage.setItem('favourites', JSON.stringify(resp));
          favCollection.reset(JSON.parse(resp));
        });
      });
    });
  }
  else {
    favCollection.reset(favourites);
  }
  */

  var userModel = new User(),
      userView = new UserView({
        model: userModel,
      }),
      periodMap = {
        'today':          'Today',
        'yesterday':      'Yesterday',
        'thisWeek':       'This Week',
        'lastWeek':       'Last Week',
        'thisMonth':      'This Month',
        'lastMonth':      'Last Month',
        'lastSixMonths':  'Last Six Months',
        'thisYear':       'This Year',
        'lastYear':       'Last Year',
        'theRest':        'The Rest (2+ years)',
      };

  // kick things off
  $.when( userModel.fetch() ).done(function() {
    console.log('All done!');
    
    $('.overlay').removeClass('active');
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