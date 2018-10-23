// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemAnimation = CES.System.extend({
  update: function(dt) {
    let comp_anim_state = null;
    let comp_texcoord = null;

    let dest_pos_comp = null;

    let reverse_x = undefined;
    let state = null;

    function IsReverseX_(src_pos, dest_pos) {
      if(src_pos[0] < dest_pos[0]) {
        return true;
      }
      if(src_pos[0] > dest_pos[0]) {
        return false;
      }

      return undefined;
    }

    this.world.getEntities('Pos', 'DestPos', 'AnimState', 'Texcoord').forEach(function(entity) {
      dest_pos_comp = entity.getComponent('DestPos');

      comp_anim_state = entity.getComponent('AnimState');
      reverse_x = IsReverseX_(dest_pos_comp.src_pos_, dest_pos_comp.dest_pos_);
      if(undefined !== reverse_x) {
        comp_anim_state.reverse_x_ = reverse_x;
      }

      state = (1 > dest_pos_comp.delta_) ? 'walk' : 'idle';
      if(-1 === comp_anim_state.state_.indexOf(state)) {
        comp_anim_state.state_ = state;
        comp_anim_state.duration_ = 0;
      }
      else{
        comp_anim_state.duration_ += dt;
      }

      comp_texcoord = entity.getComponent('Texcoord');
      comp_texcoord.texcoord_ = comp_anim_state.anim_.GetTextureCoordinate(comp_anim_state.state_, comp_anim_state.duration_, comp_anim_state.reverse_x_);
    });
  }
});
