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
    let temp_dest_pos = vec3.create();
    const tiles = this.world.getEntities('Tile');

    this.world.getEntities('DestPos').forEach(function(entity) {
      if(entity.getComponent('Player')) {
        return;
      }

      dest_pos_comp = entity.getComponent('DestPos');
      if(1 > dest_pos_comp.delta_) {
        return;
      }

      let is_right_dest_positions = [];
      const check_directions = [GRightV, GLeftV, GUpV, GDownV];
      for(let i = 0; i < 4; ++i) {
        vec3.scaleAndAdd(temp_dest_pos, dest_pos_comp.dest_pos_, check_directions[i], GTile_size);
        if(true === TileMap.CanMove(tiles, temp_dest_pos)) {
          is_right_dest_positions[is_right_dest_positions.length] = vec3.fromValues(temp_dest_pos[0], temp_dest_pos[1], temp_dest_pos[2]);
        }
      }
      if(0 === is_right_dest_positions.length) {
        return;
      }

      dest_pos_comp.delta_ = 0;
      vec3.copy(dest_pos_comp.src_pos_, dest_pos_comp.dest_pos_);
      vec3.copy(dest_pos_comp.dest_pos_, is_right_dest_positions[Math.RangeRandomInt(0, is_right_dest_positions.length)]);
    });
  }
});
