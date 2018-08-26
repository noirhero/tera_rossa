// Copyright TAP, Inc. All Rights Reserved.

const ComponentAnimState = CES.Component.extend({
  name: 'AnimState',
  init: function(url, state, duration) {
    this.url_ = url;
    this.state_ = state;
    this.duration_ = duration;
  }
})
