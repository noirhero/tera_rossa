// Copyright 2018 TAP, Inc. All Rights Reserved.

const ComponentDestPos = CES.Component.extend({
  name: 'DestPos',
  init: function(x, y, z, time) {
    const pos = vec3.fromValues(x || 0, y || 0, z || 0);
    this.src_pos_ = pos;
    this.dest_pos_ = vec3.fromValues(pos[0], pos[1], pos[2]);

    const invalid_time = time || 0.5;
    this.delta_ = 1;
    this.inv_time_ = 1 / invalid_time;
  }
});
