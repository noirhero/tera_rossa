// Copyright 2018 TAP, Inc. All Rights Reserved.

const ComponentViewport = CES.Component.extend({
  name: 'Viewport',
  init: function(x, y, z) {
    this.pos_ = vec3.fromValues(x || 0, y || 0, z || 0);
    this.dir_ = vec3.fromValues(0.0, 0.0, -1.0);
    this.up_ = vec3.fromValues(0.0, 1.0, 0.0);
    this.target_ = vec3.create();
    this.transform_view_ = mat4.create();

    this.width_ = 0;
    this.height_ = 0;
    this.width_ = 0;
    this.height_ = 0;
    this.z_near_ = -1000;
    this.z_far_ = 1000;
    this.transform_projection_ = mat4.create();

    this.transform_vp_ = mat4.create();
  }
});
