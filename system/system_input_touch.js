// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemInputTouch = CES.System.extend({
  init: function() {
    this.direction_ = vec3.create();
    this.prev_pos_ = vec3.create();
    this.touch_dir_ = vec3.create();

    let direction = this.direction_;
    let prev_pos = this.prev_pos_;
    let touch_dir = this.touch_dir_;

    function TouchStart_(event) {
      event.preventDefault();

      prev_pos[0] = event.touches[0].screenX;
      prev_pos[1] = event.touches[0].screenY;
    }

    function TouchEnd_(event) {
      event.preventDefault();

      vec3.copy(direction, touch_dir);
      vec3.copy(touch_dir, GZeroV);
      vec3.copy(prev_pos, GZeroV);
    }

    function TouchCancel_(event) {
      event.preventDefault();

      vec3.copy(touch_dir, GZeroV);
      vec3.copy(prev_pos, GZeroV);
    }

    function TouchMove_(event) {
      event.preventDefault();

      const delta_x = event.touches[0].screenX - prev_pos[0];
      const delta_y = event.touches[0].screenY - prev_pos[1];
      const abs_delta_x = Math.abs(delta_x);
      const abs_delta_y = Math.abs(delta_y);
      if(50 > (abs_delta_x + abs_delta_y)) {
        return;
      }

      if(abs_delta_x > abs_delta_y) {
        touch_dir[0] = (0 < delta_x) ? 1 : -1;
        touch_dir[1] = 0;
      }
      else {
        touch_dir[0] = 0;
        touch_dir[1] = (0 < delta_y) ? -1 : 1;
      }

      prev_pos[0] = event.touches[0].screenX;
      prev_pos[1] = event.touches[0].screenY;
    }

    const canvas = document.getElementById('main_canvas');
    canvas.addEventListener('touchstart', TouchStart_, false);
    canvas.addEventListener('touchend', TouchEnd_, false);
    canvas.addEventListener('touchcancel', TouchCancel_, false);
    canvas.ontouchmove = TouchMove_;
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

    const touch_dir = this.touch_dir_;
    const touch_dir_sqr_length = vec3.dot(touch_dir, touch_dir);
    if(GMoveEpsilon < touch_dir_sqr_length) {
      let player_pos = null;
      let pos = null;
      let right_dot = 0;

      this.world.getEntities('Player', 'Pos').forEach(function(entity) {
        player_pos = entity.getComponent('Pos').pos_;
      });

      this.world.getEntities('Arrow', 'Rot', 'Pos', 'Texture').forEach(function(entity) {
        entity.getComponent('Texture').texture_.SetRenderable(true);

        pos = entity.getComponent('Pos').pos_;
        pos[0] = player_pos[0];
        pos[1] = player_pos[1] - 60;

        const rot = entity.getComponent('Rot').rot_;
        rot[2] = Math.acos(vec3.dot(touch_dir, GUpV)) * GRadToDegree;

        right_dot = vec3.dot(touch_dir, GRightV);
        if(0 <= right_dot) {
          rot[2] *= -1;
        }
      });
    }
    else {
      this.world.getEntities('Arrow', 'Texture').forEach(function(entity) {
        entity.getComponent('Texture').texture_.SetRenderable(false);
      });
    }

    const direction = this.direction_;
    const dir_sqr_length = vec3.dot(direction, direction);
    if(GMoveEpsilon >= dir_sqr_length) {
      return;
    }

    let dest_pos_comp = null;

    this.world.getEntities('DestPos').some(function(entity) {
      dest_pos_comp = entity.getComponent('DestPos');
      if(1 > dest_pos_comp.delta_) {
        return true;
      }
      else if(!entity.getComponent('Player')) {
        return false;
      }

      dest_pos_comp.delta_ = 0;
      vec3.copy(dest_pos_comp.src_pos_, dest_pos_comp.dest_pos_);
      vec3.scaleAndAdd(dest_pos_comp.dest_pos_, dest_pos_comp.dest_pos_, direction, 30);
      return true;
    });

    vec3.set(direction, 0, 0, 0);
  }
});
