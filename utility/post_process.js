// Copyright 2018 TAP, Inc. All Rights Reserved.

class PostProcess {
  constructor(context) {
    this.gl_ = context.GL;
    const gl = this.gl_;

    this.scene_texture_ = this.CreateSceneTexture();
    this.scene_frame_buffer_ = this.CreateFrameBuffer(this.scene_texture_);
    this.scene_depth_buffer_ = this.CreateDepthBuffer();

    this.CreateVertexBuffer(context);
    this.CreateIndexBuffer(context);
    this.CreateTorchVertexShader(context);
    this.CreateTorchFragmentShader(context);

    let program = context.CreateProgram(this.vs_, this.fs_);
    this.a_projection_pos_ = gl.getAttribLocation(program, 'projection_pos');
    this.a_tex_coord_ = gl.getAttribLocation(program, 'tex_coord');
    this.u_scene_color_ = gl.getUniformLocation(program, 'scene_color');
    this.u_window_size_ = gl.getUniformLocation(program, 'window_size');
    this.u_torch_radius_ = gl.getUniformLocation(program, 'torch_radius');
    this.window_size_ = vec2.fromValues(this.scene_width_, this.scene_height_);
    this.program_ = program;

    this.is_changed_scene_size_ = true;
  }

  Begin() {
    const gl = this.gl_;
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    if(width !== this.scene_width_ || height !== this.scene_height_) {
      this.scene_texture_ = this.CreateSceneTexture();

      gl.bindFramebuffer(gl.FRAMEBUFFER, this.scene_frame_buffer_);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.scene_texture_, 0);

      this.scene_depth_buffer_ = this.CreateDepthBuffer();
      this.is_changed_scene_size_ = true;
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.scene_frame_buffer_);
  }

  End() {
    const gl = this.gl_;
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    const u_window_size_ = this.u_window_size_;
    const window_size_ = this.window_size_ = vec2.fromValues(width, height);
    const u_torch_radius_ = this.u_torch_radius_;
    let torch_radius = Math.RangeRandom(40, 50);

    gl.disable(gl.DEPTH_TEST);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.program_);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.scene_texture_);

    if(true === this.is_changed_scene_size_) {
      gl.uniform2fv(u_window_size_, window_size_);
      this.is_changed_scene_size_ = false;
    }
    gl.uniform1f(u_torch_radius_, torch_radius);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ib_);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vb_);
    gl.vertexAttribPointer(this.a_projection_pos_, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(this.a_projection_pos_);
    gl.vertexAttribPointer(this.a_tex_coord_, 2, gl.FLOAT, false, 16, 8);
    gl.enableVertexAttribArray(this.a_tex_coord_);

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }

  CreateSceneTexture() {
    const gl = this.gl_;
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    let texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    this.scene_width_ = width;
    this.scene_height_ = height;

    return texture;
  }

  CreateFrameBuffer(texture) {
    const gl = this.gl_;

    let frame_buffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, frame_buffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return frame_buffer;
  }

  CreateDepthBuffer() {
    const gl = this.gl_;
    const frame_buffer = this.scene_frame_buffer_;

    gl.bindFramebuffer(gl.FRAMEBUFFER, frame_buffer);

    let depth_buffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depth_buffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.scene_width_, this.scene_height_);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depth_buffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);

    gl.bindFramebuffer(gl.FRAMEBUFFER, frame_buffer);

    return depth_buffer;
  }

  CreateVertexBuffer(context) {
    // x, y, tu, tv
    const vertices = new Float32Array([
      -1, 1, 0, 1,
      1, 1, 1, 1,
      -1, -1, 0, 0,
      1, -1, 1, 0,
    ]);

    this.vb_ = context.CreateBuffer(this.gl_.ARRAY_BUFFER, vertices, this.gl_.STATIC_DRAW);
  }

  CreateIndexBuffer(context) {
    const indices = new Uint16Array([0, 1, 2, 2, 1, 3]);

    this.ib_ = context.CreateBuffer(this.gl_.ELEMENT_ARRAY_BUFFER, indices, this.gl_.STATIC_DRAW);
  }

  CreateTorchVertexShader(context) {
    'use strict';

    const src = [
      'attribute vec2 projection_pos;',
      'attribute vec2 tex_coord;',

      'varying vec2 out_tex_coord;',

      'void main() {',
      ' gl_Position = vec4(projection_pos, 0.0, 1.0);',
      ' out_tex_coord = tex_coord;',
      '}',
    ].join('\n');

    this.vs_ = context.CreateShader(src, this.gl_.VERTEX_SHADER);
  };

  CreateTorchFragmentShader(context) {
    'use strict';

    const src = [
      'precision mediump float;',

      'uniform sampler2D scene_color;',
      'uniform vec2 window_size;',
      'uniform float torch_radius;',

      'varying vec2 out_tex_coord;',

      'void main() {',
      ' vec2 window_center = vec2(window_size.x * 0.5, window_size.y * 0.5);',
      ' vec2 window_tex_coord = vec2(out_tex_coord.x * window_size.x, out_tex_coord.y * window_size.y);',

      ' float dist = distance(window_tex_coord, window_center);',
      ' float smoothing_dist = torch_radius * 1.5;',

      ' vec4 color = texture2D(scene_color, out_tex_coord);',
      ' if(dist <= smoothing_dist) {',
      '  if(dist >= torch_radius) {',
      '   float est = (dist - smoothing_dist) / (torch_radius- smoothing_dist);',
      '   color = vec4(color.x * est, color.y * est, color.z * est, color.a);',
      '  }',
      '  gl_FragColor = color;',
      '  return;',
      ' }',

      ' gl_FragColor = vec4(vec3(0, 0, 0), color.a);',
      '}',
    ].join('\n');

    this.fs_ = context.CreateShader(src, this.gl_.FRAGMENT_SHADER);
  };
}
