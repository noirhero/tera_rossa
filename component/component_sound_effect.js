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

    this.url_ = url;
    this.handle_ = sound_effect;
    this.id_ = null;

    this.distance_ = distance || 100;
    this.to_play_ = true;
  }
});
