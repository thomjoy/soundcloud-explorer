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
        'thisweek':       'This Week',
        'lastweek':       'Last Week',
        'thismonth':      'This Month',
        'lastmonth':      'Last Month',
        'lastsixmonths':  'Last Six Months',
        'thisyear':       'This Year',
        'lastyear':       'Last Year',
        'therest':        'The Rest (2+ years)',
        'everything':     "Everything"
      }
    };

    return constants[c];

  };
});