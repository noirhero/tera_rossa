// Copyright TAP, Inc. All Rights Reserved.

const ComponentScale2 = CES.Component.extend({
  name: 'Scale2',
  init: function(x, y) {
    'use strict';
    this.scale_ = vec2.fromValues(x || 1, y || 1);
  }
});
