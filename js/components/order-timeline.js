/* ==========================================================================
   BHUKH LAGI — Order Timeline (order-timeline.js)
   ========================================================================== */

var OrderTimeline = {
  steps: [
    { key: 'placed',   label: 'Order Placed',      field: 'placedAt' },
    { key: 'accepted', label: 'Order Accepted',     field: 'acceptedAt' },
    { key: 'preparing',label: 'Preparing',          field: null },
    { key: 'ready',    label: 'Ready for Pickup',   field: 'actualReadyAt' },
    { key: 'completed',label: 'Completed',          field: 'completedAt' }
  ],

  getStepState: function (stepKey, orderStatus) {
    var order = ['placed', 'accepted', 'preparing', 'ready', 'completed'];
    var statusMap = {
      'PENDING': 'placed',
      'PREPARING': 'preparing',
      'READY': 'ready',
      'DELAYED': 'preparing',
      'COMPLETED': 'completed',
      'CANCELLED': 'placed'
    };
    var currentKey = statusMap[orderStatus] || 'placed';
    var currentIdx = order.indexOf(currentKey);
    var stepIdx = order.indexOf(stepKey);

    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return orderStatus === 'DELAYED' && stepKey === 'preparing' ? 'delayed' : 'current';
    return 'upcoming';
  },

  render: function (order) {
    var self = this;
    var fillPercent = { 'PENDING': 10, 'PREPARING': 50, 'DELAYED': 50, 'READY': 80, 'COMPLETED': 100, 'CANCELLED': 10 };

    var html = '<div class="timeline">' +
      '<div class="timeline__line"><div class="timeline__line-fill" style="height:' + (fillPercent[order.status] || 0) + '%;"></div></div>';

    this.steps.forEach(function (step) {
      var state = self.getStepState(step.key, order.status);
      var timeStr = '';
      if (step.field && order[step.field]) {
        timeStr = TimeUtil.formatTime(order[step.field]);
      } else if (step.key === 'preparing' && order.status !== 'PENDING') {
        timeStr = order.acceptedAt ? TimeUtil.formatTime(TimeUtil.addMinutes(order.acceptedAt, 1)) : '';
      }

      var nodeIcon = '';
      if (state === 'completed') {
        nodeIcon = '<svg class="timeline__node-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
      } else if (state === 'current') {
        nodeIcon = '<span style="width:8px;height:8px;background:white;border-radius:50%;display:block;"></span>';
      } else if (state === 'delayed') {
        nodeIcon = '<svg class="timeline__node-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
      }

      var detailHtml = '';
      if (state === 'current' || state === 'delayed') {
        if (step.key === 'preparing') {
          detailHtml = '<div class="timeline__detail">';
          if (order.status === 'DELAYED') {
            detailHtml += '<strong>Taking a little longer</strong><br>';
            detailHtml += 'Updated ready time: ' + TimeUtil.formatTime(order.updatedEstimate || order.estimatedReadyAt);
          } else {
            detailHtml += 'Est. ready: ' + TimeUtil.formatTime(order.estimatedReadyAt);
          }
          detailHtml += '</div>';
        }
        if (step.key === 'ready') {
          detailHtml = '<div class="timeline__detail">Pickup window: ' + TimeUtil.formatTime(order.pickupWindowStart) + ' \u2013 ' + TimeUtil.formatTime(order.pickupWindowEnd) + '</div>';
        }
      }

      html += '<div class="timeline__step timeline__step--' + state + '">' +
        '<div class="timeline__node">' + nodeIcon + '</div>' +
        '<div class="timeline__label">' + step.label + '</div>' +
        (timeStr ? '<div class="timeline__time">' + timeStr + '</div>' : '') +
        detailHtml +
      '</div>';
    });

    html += '</div>';

    // Delay notice
    if (order.status === 'DELAYED') {
      html += '<div class="delay-notice">' +
        '<div class="delay-notice__title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Order taking a little longer</div>' +
        '<p class="delay-notice__message">\u201CHang tight \u2014 your food is worth the wait.\u201D</p>' +
        '<p class="delay-notice__time">New estimated ready time: <strong>' + TimeUtil.formatTime(order.updatedEstimate || order.estimatedReadyAt) + '</strong></p>' +
      '</div>';
    }

    return html;
  }
};
