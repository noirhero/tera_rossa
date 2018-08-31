// Copyright 2018 TAP, Inc. All Rights Reserved.

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

  CreateShader(src, type) {
    const gl = this.gl_;

    let shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('Compile shader failed.\n' + src + '\n' + gl.getShaderInfoLog(shader));
      shader = null;
    }

    return shader;
  }

  CreateBuffer(target, src, usage) {
    const gl = this.gl_;

    let buffer = gl.createBuffer();
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, src, usage);

    return buffer;
  }

  CreateProgram(vs, fs) {
    const gl = this.gl_;

    let program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      alert('Prgram link failed.');
      program = null;
    }

    return program;
  }
}
