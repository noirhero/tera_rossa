// Copyright 2018 TAP, Inc. All Rights Reserved.

var GSoundEffects = {};

const ComponentSoundEffect = CES.Component.extend({
  name: 'Sound',
  init: function(url, distance) {
    let sound_effect = GSoundEffects[url];
    if(!sound_effect) {
      sound_effect = new Howl({
        src: [url + '.ogg', url + '.mp4'],
        preload: true,
      });
    }

    const sound_id = sound_effect.play();
    sound_effect.pannerAttr({
      maxDistance: distance || 1,
    }, sound_id);
    sound_effect.stop(sound_id);

    this.url_ = url;
    this.handle_ = sound_effect;
    this.id_ = sound_id;
    this.to_play_ = true;
  }
});
