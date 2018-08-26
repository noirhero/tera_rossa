// Copyright TAP, Inc. All Rights Reserved.

const SystemAnimation = CES.System.extend({
  init: function() {
    this.anims_ = {};
  },
  update: function(dt) {
    const anims = this.anims_;

    let comp_anim_state = null;
    let anim = null;
    this.world.getEntities('AnimState').forEach(function(entity) {
      comp_anim_state = entity.getComponent('AnimState');
      anim = anims[comp_anim_state.url_];
      if(!anim) {

      }
    });
  }
});
