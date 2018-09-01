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
        start: frame_info.total_duration,
        end: frame_info.total_duration + src_frame.duration * 0.001,
        rect: [
          vec2.fromValues(left, top),
          vec2.fromValues(right, top),
          vec2.fromValues(left, bottom),
          vec2.fromValues(right, bottom),
        ],
      };
      frame_info.total_duration += src_frame.duration * 0.001;
    }
  }

  ReadFile(url, OnLoadAnimation_);

  this.GetTextureCoordinate = function(state, duration) {
    function RecursiveFind_(frames, duration, start, end) {
      const step = end - start;
      const offset = (0 === (step % 2)) ? 0 : 1;
      const pivot = start + Math.round(step / 2) - offset;

      const frame = frames[pivot];
      if(frame.start > duration) {
        return RecursiveFind_(frames, duration, start, pivot);
      }
      else if(frame.end < duration) {
        return RecursiveFind_(frames, duration, pivot, end);
      }

      return frame.rect;
    }

    const frame_info = frame_infos_[state];
    if(!frame_info) {
      return GEmptyTexcoord;
    }

    if(frame_info.total_duration < duration) {
      duration %= frame_info.total_duration;
    }

    const frames = frame_info.frames;
    return RecursiveFind_(frames, duration, 0, frames.length);
  };
}

const ComponentAnimState = CES.Component.extend({
  name: 'AnimState',
  init: function(url, state, duration) {
    let anim = GAnims[url];
    if(!anim) {
      GAnims[url] = anim = new Animation(url);
    }
    this.anim_ = anim;

    this.state_ = state || 'none';
    this.duration_ = duration || 0;
  }
});
