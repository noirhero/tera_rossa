// Copyright 2018 TAP, Inc. All Rights Reserved.

function Frame(scene) {
  'use strict';

  const frame_fn_ = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  let frame_id_ = 0;

  this.Run = function() {
    scene.Update();
    frame_id_ = frame_fn_(run_fn_);
  };
  const run_fn_ = this.Run;

  this.GetFramdId = function() {
    return frame_id_;
  };
}
