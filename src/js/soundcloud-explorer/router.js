define(['backbone'], function(Backbone) {
  return Backbone.Router.extend({
    routes: {
      "":              "",
      "likes/:period": "likes"
    },

    initialize: function() {
      
    },

    likes: function(period) {
      console.log('likes/' + period);

      if( period === 'everything' ) {
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
      }
      else {
        favouritesView = new FavouritesSectionView({
          period: periodMap[period],
          count: slice.length,
          total: userModel.get('favourites').length,
          favouritesListView: new FavouritesListView({
            collection: slice
          })
        });
      }
    }
    
  });
});