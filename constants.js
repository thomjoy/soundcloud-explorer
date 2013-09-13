define([], function() {
  return function(c) {
    var constants = {
      clientAuth: {
        client_id: '9d440de30aed58dd6f5d2ecd754ab5a6',
        redirect_uri: 'http://localhost:9999/callback.html'
      },
      periodMap: {
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
      }
    };

    return constants[c];

  };
});