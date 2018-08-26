// Copyright TAP, Inc. All Rights Reserved.

class WebGLContext {
  constructor() {
    const canvas = document.getElementById('main_canvas');
    canvas.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    canvas.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

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
