// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemInputKeydown = CES.System.extend({
  init: function() {
    this.direction_ = vec3.create();
    let direction = this.direction_;

    function Keyup_(event) {
      event.preventDefault();

      const code = event.code || event.key;
      switch(code) {
      case 'ArrowLeft':  vec3.copy(direction, GLeftV); break;
      case 'ArrowRight': vec3.copy(direction, GRightV); break;
      case 'ArrowUp':    vec3.copy(direction, GUpV);    break;
      case 'ArrowDown':  vec3.copy(direction, GDownV);    break;
      }
    }

    document.addEventListener('keyup', Keyup_, false);
  },
  update: function() {
    const turn_entity = this.world.getEntities('Turn');
    if(0 === turn_entity.length) {
      return;
    }

    const turn_comp = turn_entity[0].getComponent('Turn');
    if(false === turn_comp.is_player_turn_) {
      return;
    }

    const direction = this.direction_;
    const dir_sqr_length = vec3.dot(direction, direction);
    if(GMoveEpsilon >= dir_sqr_length) {
      return;
    }

    let dest_pos_comp = null;
    let temp_dest_pos = vec3.create();
    const tiles = this.world.getEntities('Tile');

    this.world.getEntities('DestPos').some(function(entity) {
      dest_pos_comp = entity.getComponent('DestPos');
      if(1 > dest_pos_comp.delta_) {
        return true;
      }
      else if(!entity.getComponent('Player')) {
        return false;
      }

      vec3.scaleAndAdd(temp_dest_pos, dest_pos_comp.dest_pos_, direction, GTile_size);
      if(false === TileMap.CanMove(tiles, temp_dest_pos)) {
        return true;
      }

      dest_pos_comp.delta_ = 0;
      vec3.copy(dest_pos_comp.src_pos_, dest_pos_comp.dest_pos_);
      vec3.scaleAndAdd(dest_pos_comp.dest_pos_, dest_pos_comp.src_pos_, direction, GTile_size);

      return true;
    });

    //test
    console.log(`tileMap : ${TileMap.CanMove(tiles, dest_pos_comp.dest_pos_)}`);
    vec3.set(direction, 0, 0, 0);
  }
});
