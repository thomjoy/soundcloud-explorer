define([
  'moment'
], function(
  moment
) {
  return {
    today: function(d) {
      var start = moment(moment().startOf('day')),
          end = moment(moment().endOf('day')),
          range = moment().range(start, end);
      return range.contains(moment(new Date(d)));
    },
    yesterday: function(d) {
      var start = moment(moment().subtract('days', 1).startOf('day')),
          end = moment(moment().subtract('days', 1).endOf('day')),
          range = moment().range(start, end);

      return range.contains(moment(new Date(d)));
    },
    thisweek: function(d) {
      var start = moment(moment().subtract('week', 0).startOf('week')),
          end   = moment(moment().subtract('week', 0).endOf('week')),
          range = moment().range(start, end);

      return range.contains(moment(new Date(d)));
    },
    lastweek: function(d) {
      var start = moment(moment().subtract('week', 1).startOf('week')),
          end   = moment(moment().subtract('week', 1).endOf('week')),
          range = moment().range(start, end);

      return range.contains(moment(new Date(d)));
    },
    thismonth: function(d) {
      var start = moment(moment().subtract('month', 0).startOf('month')),
          end = moment(moment().subtract('month', 0).endOf('month')),
          range = moment().range(start, end);

      return range.contains(moment(new Date(d)));
    },
    lastmonth: function(d) {
      var start = moment(moment().subtract('month', 1).startOf('month')),
          end = moment(moment().subtract('month', 1).endOf('month')),
          range = moment().range(start, end);

      return range.contains(moment(new Date(d)));
    },
    lastsixmonths: function(d) {
      var start = moment(moment().subtract('month', 6).endOf('month')),
          end = moment(moment().subtract('month', 0).startOf('month')),
          range = moment().range(start, end);

      return range.contains(moment(new Date(d)));
    },
    thisyear: function(d) {
      var start = moment(moment().subtract('year', 0).startOf('year')),
          end = moment(moment().subtract('year', 0).endOf('year')),
          range = moment().range(start, end);

      return range.contains(moment(d));
    },
    lastyear: function(d) {
      var start = moment(moment().subtract('year', 1).startOf('year')),
          end = moment(moment().subtract('year', 1).endOf('year')),
          range = moment().range(start, end);

      return range.contains(moment(new Date(d)));
    },
    therest: function(d) {
      var start = moment(moment().subtract('year', 5).endOf('year')),
          end = moment(moment().subtract('year', 2).startOf('year')),
          range = moment().range(start, end);

      return range.contains(moment(new Date(d)));
    }
  };
});