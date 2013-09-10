// app.js
define([
  'c/favourites',
  'soundcloud'
], function(
  FavouritesCollection,
  SC
){
  'use strict';

  SC.connect(function() {
    debugger;
    console.log('here');
  });

  var favourites = JSON.parse(window.localStorage.getItem('favourites'));
  var favCollection = new FavouritesCollection(favourites);
});