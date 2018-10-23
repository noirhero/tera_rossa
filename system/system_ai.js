// Copyright TAP, Inc. All Rights Reserved.

const SystemAI = CES.System.extend({
  update: function() {
    const turn_entity = this.world.getEntities('Turn');
    if(0 === turn_entity.length) {
      return;
    }

    const turn_comp = turn_entity[0].getComponent('Turn');
    if(true === turn_comp.is_player_turn_) {
      return;
    }

    const player_entity = this.world.getEntities('Player', 'DestPos');
    if(0 === player_entity.length) {
      return;
    }
    else if(1 > player_entity[0].getComponent('DestPos').delta_) {
      return;
    }

    let dest_pos_comp = null;

    this.world.getEntities('DestPos').forEach(function(entity) {
      if(entity.getComponent('Player')) {
        return;
      }

      dest_pos_comp = entity.getComponent('DestPos');
      if(1 > dest_pos_comp.delta_) {
        return;
      }

      dest_pos_comp.delta_ = 0;
      vec3.copy(dest_pos_comp.src_pos_, dest_pos_comp.dest_pos_);

      switch(Math.RangeRandomInt(0, 4)) {
      case 0: vec3.scaleAndAdd(dest_pos_comp.dest_pos_, dest_pos_comp.dest_pos_, GRightV, 30); break;
      case 1: vec3.scaleAndAdd(dest_pos_comp.dest_pos_, dest_pos_comp.dest_pos_, GLeftV, 30); break;
      case 2: vec3.scaleAndAdd(dest_pos_comp.dest_pos_, dest_pos_comp.dest_pos_, GUpV, 30); break;
      case 3: vec3.scaleAndAdd(dest_pos_comp.dest_pos_, dest_pos_comp.dest_pos_, GDownV, 30); break;
      }
    });
  }
});
