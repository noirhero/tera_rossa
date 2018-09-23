// Copyright 2018 TAP, Inc. All Rights Reseved.

const SystemSoundListener = CES.System.extend({
  update: function() {
    let pos = null;

    this.world.getEntities('Player', 'Pos').forEach(function(entity) {
      pos = entity.getComponent('Pos').pos_;
      Howler.pos(pos[0], pos[1], 0);
    });
  }
});
