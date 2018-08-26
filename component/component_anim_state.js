// Copyright 2018 TAP, Inc. All Rights Reserved.

var GAnims = {};

function Animation(url) {
  'use strict';

  let frame_infos_ = {};

  function OnLoadAnimation_(json_text) {
    const data = JSON.parse(json_text);

    const width = data.meta.size.w;
    const height = data.meta.size.h;

    const frames = data.frames;
    for(const i in frames) {
      const state_name = i.slice(0, i.indexOf(' '));

      let frame_info = frame_infos_[state_name];
      if(!frame_info) {
        frame_info = frame_infos_[state_name]  = {
          total_duration: 0,
          frames: [],
        };
      }

      const src_frame = frames[i];
      const left = src_frame.frame.x / width;
      const top = 1.0 - src_frame.frame.y / height;
      const right = left + src_frame.frame.w / width;
      const bottom = top - src_frame.frame.h / height;

      frame_info.frames[frame_info.frames.length] = {
        start: frame_info.total_duration * 0.001,
        end: (frame_info.total_duration + src_frame.duration) * 0.001,
        rect: [
          left, top,
          right, top,
          left, bottom,
          right, bottom,
        ],
      };
      frame_info.total_duration += src_frame.duration * 0.001;
    }
  }

  ReadFile(url, OnLoadAnimation_);
}

const ComponentAnimState = CES.Component.extend({
  name: 'AnimState',
  init: function(url, state, duration) {
    let anim = GAnims[url];
    if(!anim) {
      GAnims[url] = anim = new Animation(url);
    }
    this.anim_ = anim;

    this.state_ = state;
    this.duration_ = duration;
  }
});
