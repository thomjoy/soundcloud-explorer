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

  ['today', 'yesterday', 'lastWeek', 'lastYear'].forEach(function(period) {
    var slice = favCollection.getRange(period);
    var favouritesView = new FavouritesSectionView({
      period: period,
      count: slice.length,
      favouritesListView: new FavouritesListView({
        collection: slice
      })
    });
  });
  
  
});