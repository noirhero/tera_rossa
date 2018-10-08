// Copyright 2018 TAP, Inc. All Rights Reserved.

const ComponentRot = CES.Component.extend({
  name: 'Rot',
  init: function(eulerX, eulerY, eulerZ) {
    this.rot_ = vec3.fromValues(eulerX || 0, eulerY || 0, eulerZ || 0);
  }
});
