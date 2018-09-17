// Copyright 2018 TAP, Inc. All Rihgts Reserved.

const ComponentSoundBGM = CES.Component.extend({
  name: 'BGM',
  init: function(url) {
    this.source_url_ = url;
    this.handle_ = null;
    this.id_ = null;
  }
});
