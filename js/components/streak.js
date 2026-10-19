/* ==========================================================================
   BHUKH LAGI — Streak Component (streak.js)
   ========================================================================== */

var StreakComponent = {
  days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  dayLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

  renderCompact: function () {
    var streak = Store.getStreak();
    var filledCount = this.days.filter(function (d) { return streak.week[d]; }).length;
    var progress = Math.round((filledCount / 7) * 100);
    var self = this;

    var daysHtml = this.days.map(function (d, i) {
      var filled = streak.week[d] ? ' streak__day-dot--filled' : '';
      return '<div class="streak__day">' +
        '<span class="streak__day-label">' + self.dayLabels[i].charAt(0) + '</span>' +
        '<span class="streak__day-dot' + filled + '"></span>' +
      '</div>';
    }).join('');

    return '<div class="streak streak--compact">' +
      '<span class="streak__count">\uD83D\uDD25 <span class="streak__count-number">' + streak.current + '</span> days</span>' +
      '<div class="streak__days">' + daysHtml + '</div>' +
      '<div class="streak__bar"><div class="streak__bar-fill" style="width:' + progress + '%;"></div></div>' +
    '</div>';
  },

  renderExpanded: function () {
    var streak = Store.getStreak();
    var filledCount = this.days.filter(function (d) { return streak.week[d]; }).length;
    var progress = Math.round((filledCount / 7) * 100);
    var message = BRAND.getStreakMessage(streak.current);
    var self = this;

    var daysHtml = this.days.map(function (d, i) {
      var filled = streak.week[d] ? ' streak__day-dot--filled' : '';
      return '<div class="streak__day">' +
        '<span class="streak__day-label">' + self.dayLabels[i] + '</span>' +
        '<span class="streak__day-dot' + filled + '"></span>' +
      '</div>';
    }).join('');

    return '<div class="streak">' +
      '<div class="streak__header">' +
        '<span class="streak__count">\uD83D\uDD25 <span class="streak__count-number">' + streak.current + '</span> Day Streak</span>' +
        '<span class="streak__best">Best: ' + streak.best + ' days</span>' +
      '</div>' +
      '<div class="streak__days">' + daysHtml + '</div>' +
      '<div class="streak__bar"><div class="streak__bar-fill" style="width:' + progress + '%;"></div></div>' +
      '<p class="streak__message">' + DOM.escapeHTML(message) + '</p>' +
    '</div>';
  }
};
