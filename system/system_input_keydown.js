// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemInputKeydown = CES.System.extend({
  init: function() {
    this.direction_ = vec3.create();

    const dir_right = vec3.fromValues(1, 0, 0);
    const dir_up = vec3.fromValues(0, 1, 0);
    let direction = this.direction_;

    function Keyup_(event) {
      event.preventDefault();

      switch(event.code) {
      case 'ArrowLeft':  vec3.subtract(direction, direction, dir_right); break;
      case 'ArrowRight': vec3.add(direction, direction, dir_right);      break;
      case 'ArrowUp':    vec3.add(direction, direction, dir_up);         break;
      case 'ArrowDown':  vec3.subtract(direction, direction, dir_up);    break;
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
    if(0.01 >= dir_sqr_length) {
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
      if(0.01 < speed) {
        return false;
      }
      else if(!entity.getComponent('Player')) {
        return true;
      }

      vec3.scaleAndAdd(dest_pos, dest_pos, direction, 30);
      return true;
    });
    vec3.set(direction, 0, 0, 0);
  }
});
