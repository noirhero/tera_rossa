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

    let pos = null;
    let dest_pos = null;
    let velocity = vec3.create();
    let speed = 0;

    this.world.getEntities('Pos', 'DestPos').some(function(entity) {
      pos = entity.getComponent('Pos').pos_;
      dest_pos = entity.getComponent('DestPos').dest_pos_;
      velocity = vec3.subtract(velocity, dest_pos, pos);
      speed = vec3.dot(velocity, velocity);
      if(GMoveEpsilon < speed) {
        return true;
      }
      else if(!entity.getComponent('Player')) {
        return false;
      }

      vec3.scaleAndAdd(dest_pos, dest_pos, direction, 30);
      return true;
    });

    vec3.set(direction, 0, 0, 0);
  }
});
