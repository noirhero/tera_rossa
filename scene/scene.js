// Copyright TAP, Inc. All Rights Reserved.

class Scene {
  constructor() {
    this.frame_ = new Frame(this);
    this.cancel_frame_fn_ = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    const context = new WebGLContext();
    const canvas = context.Canvas;
    canvas.addEventListener('webglcontextlost', this.ContextLost_, false);
    canvas.addEventListener('webglcontextrestored', this.ContextRestored_, false);

    this.context_ = context;
    this.world_ = new CES.World();
    this.timer_ = new Timer();
  }

  ContextLost_(event) {
    event.preventDefault();
    this.cancel_frame_fn_(this.frame_.GetFramdId());
  }

  ContextRestored_(event) {
    event.preventDefault();
    this.frame_.Run();
  }

  Start() {
    this.frame_.Run();
  }

  Update() {
    this.timer_.Update();
    this.world_.update(this.timer_.Delta);
  }
}
