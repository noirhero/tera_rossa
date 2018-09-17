// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemSoundBGM = CES.System.extend({
  update: function() {
    let bgm_comp = null;

    function CreateHowl_() {
      bgm_comp.handle_ = new Howl({
        src: [bgm_comp.url_ + '.ogg', bgm_comp.url_ + '.mp4'],
        autoplay: true,
      });
    }

    this.world.getEntities('BGM').forEach(function(entity) {
      bgm_comp = entity.getComponent('BGM');
      if(!bgm_comp.handle_) {
        CreateHowl_();
      }
    });
  }
});
