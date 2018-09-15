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

    let pos = null;
    let dest_pos = null;
    let velocity = vec3.create();

    function CalculateSpeed_(entity) {
      pos = entity.getComponent('Pos').pos_;
      dest_pos = entity.getComponent('DestPos').dest_pos_;
      vec3.subtract(velocity, dest_pos, pos);
      return vec3.dot(velocity, velocity);
    }

    let is_moving_player = false;
    this.world.getEntities('Player', 'Pos', 'DestPos').some(function(entity) {
      if(0.01 < CalculateSpeed_(entity)) {
        is_moving_player = true;
        return true;
      }
      return false;
    });

    if(true === is_moving_player) {
      return;
    }

    this.world.getEntities('Pos', 'DestPos').forEach(function(entity) {
      if(entity.getComponent('Player')) {
        return;
      }
      else if(0.01 < CalculateSpeed_(entity)) {
        return;
      }

      switch(Math.RangeRandomInt(0, 4)) {
      case 0: vec3.scaleAndAdd(dest_pos, dest_pos, GRightV, 30); break;
      case 1: vec3.scaleAndAdd(dest_pos, dest_pos, GLeftV, 30); break;
      case 2: vec3.scaleAndAdd(dest_pos, dest_pos, GUpV, 30); break;
      case 3: vec3.scaleAndAdd(dest_pos, dest_pos, GDownV, 30); break;
      }
    });
  }
});
