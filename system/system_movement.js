// Copyright 2018 TAP, Inc. All Rihgts Reserved.

const SystemMovement = CES.System.extend({
  update: function(delta) {
    function UpdateAnimComponent_(anim_comp, state, reverse_x) {
      if(!anim_comp) {
        return;
      }

      if(undefined !== reverse_x) {
        anim_comp.reverse_x_ = reverse_x;
      }

      if(-1 === anim_comp.state_.indexOf(state)) {
        anim_comp.state_ = state;
        anim_comp.duration_ = 0;
      }
    }

    let pos = null;
    let dest_pos = null;
    let pos_at_dest = vec3.create();
    let speed = 0;

    let anim_comp = null;

    this.world.getEntities('Pos', 'DestPos').forEach(function(entity) {
      anim_comp = entity.getComponent('AnimState');

      pos = entity.getComponent('Pos').pos_;
      dest_pos = entity.getComponent('DestPos').dest_pos_;
      vec3.subtract(pos_at_dest, dest_pos, pos);
      speed = vec3.dot(pos_at_dest, pos_at_dest);

      if(GMoveEpsilon >= speed) {
        UpdateAnimComponent_(anim_comp, 'idle');
      }
      else {
        speed = 1 / Math.sqrt(speed);
        pos_at_dest[0] *= speed;
        pos_at_dest[1] *= speed;
        pos_at_dest[2] *= speed;
        vec3.scaleAndAdd(pos, pos, pos_at_dest, delta * 50);

        UpdateAnimComponent_(anim_comp, 'walk', (-0.1 > pos_at_dest[0]) ? false : (0.1 < pos_at_dest[0]) ? true : undefined);
      }
    });
  }
});
