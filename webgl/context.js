// Copyright TAP, Inc. All Rights Reserved.

class WebGLContext {
  constructor() {
    const canvas = document.getElementById('main_canvas');
    const gl = canvas.getContext('webgl', {
      premultipliedAlpha: false,
      antialias: false,
    });

    this.canvas_ = canvas;
    this.gl_ = gl;
  }

  get Canvas() {
    return this.canvas_;
  }

  get GL() {
    return this.gl_;
  }
}
