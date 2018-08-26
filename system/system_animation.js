// Copyright TAP, Inc. All Rights Reserved.

const SystemAnimation = CES.System.extend({
  update: function(dt) {
    const entities = this.world.getEntities('AnimState');
    const num_entities = entities.length;
  }
});
