// app.js
define([
  'c/favourites',
  'v/favouritelist',
  'v/favouritesection',
  'dateranges',
  'soundcloud'
], function(
  FavouritesCollection,
  FavouritesListView,
  FavouritesSectionView,
  DateRanges,
  SC
){
  'use strict';

  var favourites = JSON.parse(window.localStorage.getItem('favourites')),
      favCollection = new FavouritesCollection(favourites);

  // @todo: fix this, should be in the collection.
  // Backbone.offline?
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

  SC.get('/me', function(me) {
    console.log(me);
  });

  var periodMap = {
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

  _.keys(periodMap).forEach(function(period) {
    var slice = favCollection.getRange(period, 'Desc');
    var favouritesView = new FavouritesSectionView({
      period: periodMap[period],
      count: slice.length,
      total: favCollection.length,
      favouritesListView: new FavouritesListView({
        collection: slice
      })
    });
  });
  
  
});