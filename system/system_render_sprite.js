// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemRenderSprite = CES.System.extend({
  init: function(context) {
    const gl = context.GL;

    const vs = context.CreateShader([
      'attribute vec3 world_pos;',
      'attribute vec2 tex_coord;',

      'uniform mat4 vp_transform;',

      'varying vec2 fs_tex_coord;',

      'void main() {',
      ' gl_Position = vp_transform * vec4(world_pos, 1.0);',
      ' fs_tex_coord = tex_coord;',
      '}',
    ].join('\n'), gl.VERTEX_SHADER);

    const fs = context.CreateShader([
      'precision mediump float;',

      'uniform sampler2D sampler_sprite;',

      'varying vec2 fs_tex_coord;',

      'void main() {',
      ' gl_FragColor = texture2D(sampler_sprite, fs_tex_coord);',
      ' if(0.0 == gl_FragColor.a) {',
      '   discard;',
      ' }',
      '}',
    ].join('\n'), gl.FRAGMENT_SHADER);

    const program = context.CreateProgram(vs, fs)

    const vb = context.CreateBuffer(gl.ARRAY_BUFFER, GBatchQuadV_XYZUV, gl.DYNAMIC_DRAW);
    const ib = context.CreateBuffer(gl.ELEMENT_ARRAY_BUFFER, GBatchQuadI, gl.STATIC_DRAW);

    this.gl_ = gl;
    this.vs_ = vs;
    this.fs_ = fs;
    this.program_ = program;
    this.vb_ = vb;
    this.ib_ = ib;
    this.a_world_pos_ = gl.getAttribLocation(program, 'world_pos');
    this.a_tex_coord_ = gl.getAttribLocation(program, 'tex_coord');
    this.u_vp_transform_ = gl.getUniformLocation(program, 'vp_transform');
    this.s_sprite_ = gl.getUniformLocation(program, 'sampler_sprite');
  },
  update: function() {
    const gl = this.gl_;
    const world = this.world;
    const a_world_pos = this.a_world_pos_;
    const a_tex_coord = this.a_tex_coord_;

    const entity_viewports = world.getEntities('Viewport');
    if(0 === entity_viewports) {
      return;
    }

    const comp_viewport = entity_viewports[0].getComponent('Viewport');
    gl.viewport(0, 0, comp_viewport.width_, comp_viewport.height_);

    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(this.program_);
    gl.uniformMatrix4fv(this.u_vp_transform_, false, comp_viewport.transform_vp_);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ib_);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vb_);
    gl.vertexAttribPointer(a_world_pos, 3, gl.FLOAT, false, 20, 0);
    gl.enableVertexAttribArray(a_world_pos);
    gl.vertexAttribPointer(a_tex_coord, 2, gl.FLOAT, false, 20, 12);
    gl.enableVertexAttribArray(a_tex_coord);

    let texture = null;
    let scale = null;
    let pos = null;

    let num_draw = 0;
    let offset = 0;
    let world_transform = mat4.create();
    let world_pos = vec3.create();
    world.getEntities('Scale', 'Pos', 'Texture').forEach(function(entity) {
      texture = entity.getComponent('Texture').texture_;
      if(false === texture.IsLoaded()) {
        return;
      }

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture.GetTexture());

      scale = entity.getComponent('Scale').scale_;
      pos = entity.getComponent('Pos').pos_;

      ++num_draw;
      mat4.fromRotationTranslationScale(world_transform, GQuatI, pos, scale);

      for(let i = 0; i < 4; ++i) {
        vec3.transformMat4(world_pos, GQuadLocalPos[i], world_transform);

        GBatchQuadV_XYZUV[offset++] = world_pos[0];
        GBatchQuadV_XYZUV[offset++] = world_pos[1];
        GBatchQuadV_XYZUV[offset++] = world_pos[2];
        GBatchQuadV_XYZUV[offset++] = GEmptyTexcoord[i][0];
        GBatchQuadV_XYZUV[offset++] = GEmptyTexcoord[i][1];
      }
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, GBatchQuadV_XYZUV);
    });

    if(0 === num_draw) {
      return;
    }

    gl.drawElements(gl.TRIANGLES, num_draw * 6/*two polygon*/, gl.UNSIGNED_SHORT, 0);
  }
});
