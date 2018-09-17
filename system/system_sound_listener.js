// Copyright 2018 TAP, Inc. All Rights Reseved.

const SystemSoundListener = CES.System.extend({
  update: function() {
    let pos = null;
    let dest_pos = null;
    let velocity = vec3.create();
    let speed = 0;

    this.world.getEntities('Player', 'Pos', 'DestPos').forEach(function(entity) {
      pos = entity.getComponent('Pos').pos_;
      dest_pos = entity.getComponent('DestPos').dest_pos_;
      vec3.subtract(velocity, dest_pos, pos);
      speed = vec3.dot(velocity, velocity);

      if(GMoveEpsilon < speed) {
        speed = 1 / Math.sqrt(speed);
        velocity[0] *= speed;
        velocity[1] *= speed;
        velocity[2] *= speed;

        Howler.orientation(pos[0], pos[1], 0, velocity[0], velocity[1], 0);
      }
      else {
        Howler.pos(pos[0], pos[1], 0);
      }
    });
  }
});
