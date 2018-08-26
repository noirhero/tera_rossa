// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemAnimation = CES.System.extend({
  update: function(dt) {
    let comp_anim_state = null;

    this.world.getEntities('AnimState').forEach(function(entity) {
      comp_anim_state = entity.getComponent('AnimState');
      comp_anim_state.duration_ += dt;
    });
  },

});
