// Copyright 2018 TAP, Inc. All Rihgts Reserved.

const SystemMovement = CES.System.extend({
  update: function(delta) {
    let pos = null;
    let dest_pos = null;
    let pos_at_dest = vec3.create();
    let sqr_length = 0;

    let anim_comp = null;
    let current_anim_state = null;

    const walk_anim_state = 'walk';
    const idle_anim_state = 'idle';

    this.world.getEntities('Pos', 'DestPos').forEach(function(entity) {
      anim_comp = entity.getComponent('AnimState');

      pos = entity.getComponent('Pos').pos_;
      dest_pos = entity.getComponent('DestPos').dest_pos_;
      vec3.subtract(pos_at_dest, dest_pos, pos);
      sqr_length = vec3.dot(pos_at_dest, pos_at_dest);

      if(0.01 >= sqr_length) {
        current_anim_state = idle_anim_state;
      }
      else {
        current_anim_state = walk_anim_state;

        sqr_length = 1 / Math.sqrt(sqr_length);
        pos_at_dest[0] *= sqr_length;
        pos_at_dest[1] *= sqr_length;
        pos_at_dest[2] *= sqr_length;
        vec3.scaleAndAdd(pos, pos, pos_at_dest, delta * 50);
      }

      if(anim_comp) {
        if(-1 === anim_comp.state_.indexOf(current_anim_state)) {
          anim_comp.state_ = current_anim_state;
          anim_comp.duration_ = 0;
        }
      }
    });
  }
});
