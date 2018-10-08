// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemMoveSoundEffect = CES.System.extend({
  update: function() {
    let sound_comp = null;
    let pos = null;
    let delta = 0;

    this.world.getEntities('DestPos', 'Sound').forEach(function(entity) {
      pos = entity.getComponent('Pos').pos_;
      sound_comp = entity.getComponent('Sound');
      delta = entity.getComponent('DestPos').delta_;

      if(1 > delta) {
        if(true === sound_comp.to_play_) {
          if(false === sound_comp.handle_.playing()) {
            if(!sound_comp.id_) {
              sound_comp.id_ = sound_comp.handle_.play();
              sound_comp.handle_.once('play', function() {
                sound_comp.handle_.pos(pos[0], pos[1], 0, sound_comp.id_);
                sound_comp.handle_.volume(0.85, sound_comp.id_);
                sound_comp.handle_.pannerAttr({
                  maxDistance: sound_comp.distance_,
                }, sound_comp.id_);
              });
            }
            else {
              sound_comp.handle_.pos(pos[0], pos[1], 0, sound_comp.id_);
              sound_comp.handle_.play(sound_comp.id_);
            }
          }

          sound_comp.to_play_ = false;
        }
        else {
          sound_comp.handle_.pos(pos[0], pos[1], 0, sound_comp.id_);
        }
      }
      else {
        if(true === sound_comp.handle_.playing(sound_comp.id_)) {
          sound_comp.handle_.stop(sound_comp.id_);
        }

        sound_comp.to_play_ = true;
      }
    });
  }
});
