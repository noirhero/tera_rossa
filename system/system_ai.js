// Copyright TAP, Inc. All Rights Reserved.

const SystemAI = CES.System.extend({
  update: function() {
    const turn_entity = this.world.getEntities('Turn');
    if(0 === turn_entity.length) {
      return;
    }

    const player_entity = this.world.getEntities('Player', 'DestPos');
    if(0 === player_entity.length) {
      return;
    }
    else if(1 > player_entity[0].getComponent('DestPos').delta_) {
      return;
    }

    const turn_comp = turn_entity[0].getComponent('Turn');
    if(true === turn_comp.is_player_turn_) {
      let gameover_entity = this.world.getEntities('Gameover', 'Texture');
      if(0 === gameover_entity.length) {
        return;
      }

      let gameover_texture = gameover_entity[0].getComponent('Texture').texture_;
      const gameover_pos = gameover_entity[0].getComponent('Pos');

      if(!gameover_texture || !gameover_pos) {
        return;
      }

      this.world.getEntities('DestPos').forEach(function(entity) {
        if(entity.getComponent('Player')) {
          return;
        }

        let player_pos = player_entity[0].getComponent('Pos').pos_;
        let enemy_pos = entity.getComponent('Pos').pos_;

        vec3.copy(gameover_pos.pos_, player_pos);

        let gap = vec2.fromValues(player_pos[0] - enemy_pos[0], player_pos[1] - enemy_pos[1]);
        let dist = (gap[0] * gap[0]) + (gap[1] * gap[1]);
        if(Math.sqrt(dist) <= 20) {
          gameover_texture.SetRenderable(true);
        }
      });
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
