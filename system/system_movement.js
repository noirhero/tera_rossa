// Copyright 2018 TAP, Inc. All Rihgts Reserved.

const SystemMovement = CES.System.extend({
  update: function(delta) {

    let pos = null;
    let dest_pos = null;
    let pos_at_dest = vec3.create();
    let speed = 0;

    this.world.getEntities('Pos', 'DestPos').forEach(function(entity) {
      pos = entity.getComponent('Pos').pos_;
      dest_pos = entity.getComponent('DestPos').dest_pos_;
      vec3.subtract(pos_at_dest, dest_pos, pos);
      speed = vec3.dot(pos_at_dest, pos_at_dest);

      if(GMoveEpsilon < speed) {
        speed = 1 / Math.sqrt(speed);
        pos_at_dest[0] *= speed;
        pos_at_dest[1] *= speed;
        pos_at_dest[2] *= speed;
        vec3.scaleAndAdd(pos, pos, pos_at_dest, delta * 50);
      }
    });
  }
});
