// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemAnimation = CES.System.extend({
  update: function(dt) {
    let comp_anim_state = null;
    let comp_texcoord = null;

    let pos = null;
    let dest_pos = null;
    let pos_at_dest = vec3.create();

    let reverse_x = undefined;
    let state = null;
    let speed = 0;
    
    function IsReverseX_(in_x) {
      if(-0.1 > in_x) {
        return false;
      }
      else if(0.1 < in_x) {
        return true;
      }

      return undefined;
    }

    function IsMoving_(pos_at_dest) {
      speed = vec3.dot(pos_at_dest, pos_at_dest);
      return (GMoveEpsilon < speed);
    }

    this.world.getEntities('AnimState', 'Texcoord').forEach(function(entity) {
      pos = entity.getComponent('Pos').pos_;
      dest_pos = entity.getComponent('DestPos').dest_pos_;
      vec3.subtract(pos_at_dest, dest_pos, pos);      

      comp_anim_state = entity.getComponent('AnimState');
      reverse_x = IsReverseX_(pos_at_dest[0]);
      if(undefined !== reverse_x) {
        comp_anim_state.reverse_x_ = reverse_x;
      }      

      state = IsMoving_(pos_at_dest) ? 'walk' : 'idle';
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
