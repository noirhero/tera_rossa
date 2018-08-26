// Copyright TAP, Inc. All Rights Reserved.

function Main() {
  'use strict';

  const frame_fn_ = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  const cancel_fram_fn_ = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  const world = new CES.World();

  const player = new CES.Entity();
  world.addEntity(player);
  player.addComponent(new ComponentScale2());
  player.addComponent(new ComponentPos2());

  let prev_time = Date.now();
  let now_time = 0;
  let frame_id = 0;
  function Run() {
    now_time = Date.now();
    world.update(now_time - prev_time);
    prev_time = now_time;

    frame_id = frame_fn_(Run);
  }
  Run();
};
