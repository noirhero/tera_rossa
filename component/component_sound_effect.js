// Copyright 2018 TAP, Inc. All Rights Reserved.

const ComponentSoundEffect = CES.Component.extend({
  name: 'Sound',
  init: function(url, x, y, z) {
    this.source_url_ = url;
    this.handle_ = null;
    this.id_ = null;

    this.to_play_ = true;
    this.pos_ = vec3.create(x || 0, y || 0, z || 0);
  }
});
