// Copyright 2018 TAP, Inc. All Rights Reserved.

const ComponentPos2 = CES.Component.extend({
  name: 'Pos2',
  init: function(x, y) {
    this.pos_ = vec2.fromValues(x || 0, y || 0);
  }
});
