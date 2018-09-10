// Copyright 2018 TAP, Inc. All Rights Reserved.

const ComponentDestPos = CES.Component.extend({
  name: 'DestPos',
  init: function(x, y, z) {
    this.dest_pos_ = vec3.fromValues(x || 0, y || 0, z || 0);
  }
});
