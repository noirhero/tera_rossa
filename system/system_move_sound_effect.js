// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemMoveSoundEffect = CES.System.extend({
  update: function() {
    let sound_comp = null;

    let pos = null;
    let dest_pos = null;
    let velocity = vec3.create();
    let speed = 0;

    this.world.getEntities('Pos', 'DestPos', 'Sound').forEach(function(entity) {
      sound_comp = entity.getComponent('Sound');
      pos = entity.getComponent('Pos').pos_;
      dest_pos = entity.getComponent('DestPos').dest_pos_;
      vec3.subtract(velocity, dest_pos, pos);
      speed = vec3.dot(velocity, velocity);

      if(GMoveEpsilon < speed) {
        if(!sound_comp.handle_) {
          sound_comp.handle_ = new Howl({
            src: [sound_comp.source_url_ + '.wav']
          });
        }
        else if(true === sound_comp.to_play_) {
          if(!sound_comp.id_) {
            sound_comp.id_ = sound_comp.handle_.play();
            sound_comp.handle_.pannerAttr({
              refDistance: 2,
            }, sound_comp.id_);
          }
          else if(false === sound_comp.handle_.playing()) {
            sound_comp.handle_.play(sound_comp.id_);
          }
        }

        sound_comp.to_play_ = false;
        sound_comp.handle_.pos(pos[0], pos[1], 0, sound_comp.id_);
      }
      else {
        if(sound_comp.id_&& true === sound_comp.handle_.playing(sound_comp.id_)) {
          sound_comp.handle_.stop(sound_comp.id_);
        }

        sound_comp.to_play_ = true;
      }
    });
  }
});
