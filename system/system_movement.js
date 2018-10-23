// Copyright 2018 TAP, Inc. All Rihgts Reserved.

const SystemMovement = CES.System.extend({
  update: function(delta) {

    let pos = null;
    let dest_pos_comp = null;

    this.world.getEntities('Pos', 'DestPos').forEach(function(entity) {
      pos = entity.getComponent('Pos').pos_;
      dest_pos_comp = entity.getComponent('DestPos');
      if(1 <= dest_pos_comp.delta_) {
        return;
      }

      dest_pos_comp.delta_ = Math.min(1, dest_pos_comp.delta_ + (delta * dest_pos_comp.inv_time_));
      vec3.lerp(pos, dest_pos_comp.src_pos_, dest_pos_comp.dest_pos_, dest_pos_comp.delta_);
    });
  }
});
