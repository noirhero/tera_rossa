// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemSoundBGM = CES.System.extend({
  update: function() {
    let bgm_comp = null;

    this.world.getEntities('BGM').forEach(function(entity) {
      bgm_comp = entity.getComponent('BGM');
      if(!bgm_comp.handle_) {
        bgm_comp.handle_ = new Howl({
          src: [bgm_comp.source_url_ + '.ogg', bgm_comp.source_url_ + '.mp4'],
        });
      }
      else if(!bgm_comp.id_) {
        bgm_comp.id_ = bgm_comp.handle_.play();
      }
      else if(false === bgm_comp.handle_.playing(bgm_comp.id_)) {
        bgm_comp.handle_.play(bgm_comp.id_);
      }
    });
  }
});
