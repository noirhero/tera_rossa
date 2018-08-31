// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemAnimation = CES.System.extend({
  update: function(dt) {
    let comp_anim_state = null;
    let comp_texcoord = null;

    this.world.getEntities('AnimState', 'Texcoord').forEach(function(entity) {
      comp_anim_state = entity.getComponent('AnimState');
      comp_anim_state.duration_ += dt;

      comp_texcoord = entity.getComponent('Texcoord');
      comp_texcoord.texcoord_ = comp_anim_state.anim_.GetTextureCoordinate(comp_anim_state.state_, comp_anim_state.duration_);
    });
  },

});
