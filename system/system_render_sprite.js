// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemRenderSprite = CES.System.extend({
  init: function(context) {
    const gl = context.GL;

    const vs = context.CreateShader([
      'attribute vec3 world_pos;',
      'attribute vec2 tex_coord;',
      'attribute float tex_index;',

      'uniform mat4 vp_transform;',

      'varying vec2 fs_tex_coord;',
      'varying float fs_tex_index;',

      'void main() {',
      '  gl_Position = vp_transform * vec4(world_pos, 1.0);',
      '  fs_tex_coord = tex_coord;',
      '  fs_tex_index = tex_index;',
      '}',
    ].join('\n'), gl.VERTEX_SHADER);

    const fs = context.CreateShader([
      'precision mediump float;',

      'uniform sampler2D sampler_sprite[' + GLimitTexture + '];',

      'varying vec2 fs_tex_coord;',
      'varying float fs_tex_index;',

      'vec4 FindTexture(int tex_index) {',
      '  for(int i = 0; i < ' + GLimitTexture + '; ++i) {',
      '    if(i == tex_index) {',
      '      return texture2D(sampler_sprite[i], fs_tex_coord);',
      '    }',
      '  }',
      '  return vec4(1.0);',
      '}',

      'void main() {',
      '  gl_FragColor = FindTexture(int(fs_tex_index));',
      '  if(0.0 == gl_FragColor.a) {',
      '    discard;',
      '  }',
      '}',
    ].join('\n'), gl.FRAGMENT_SHADER);

    const program = context.CreateProgram(vs, fs)

    const vb = context.CreateBuffer(gl.ARRAY_BUFFER, GBatchQuadV_XYZIUV, gl.DYNAMIC_DRAW);
    const ib = context.CreateBuffer(gl.ELEMENT_ARRAY_BUFFER, GBatchQuadI, gl.STATIC_DRAW);

    this.gl_ = gl;
    this.vs_ = vs;
    this.fs_ = fs;
    this.program_ = program;
    this.vb_ = vb;
    this.ib_ = ib;
    this.a_world_pos_ = gl.getAttribLocation(program, 'world_pos');
    this.a_tex_coord_ = gl.getAttribLocation(program, 'tex_coord');
    this.a_tex_index_ = gl.getAttribLocation(program, 'tex_index');
    this.u_vp_transform_ = gl.getUniformLocation(program, 'vp_transform');
    this.s_sprite_ = gl.getUniformLocation(program, 'sampler_sprite');

    this.post_process_ = new PostProcess(context);
  },
  update: function() {
    const gl = this.gl_;
    const post_process = this.post_process_;
    const world = this.world;
    const s_sprite = this.s_sprite_;
    const num_max_offset = GBatchQuadV_XYZIUV.length;

    let num_draw = 0;
    let offset = 0;
    let bind_textures = [];
    let bind_texture_indices = [];

    let is_first = true;
    function Draw_() {
      if(true === is_first) {
        is_first = false;

        const entity_viewports = world.getEntities('Viewport');
        if(0 === entity_viewports.length) {
          return;
        }

        const comp_viewport = entity_viewports[0].getComponent('Viewport');
        if(comp_viewport.width_ !== this.width_ || comp_viewport.height_ !== this.height_) {
          gl.viewport(0, 0, comp_viewport.width_, comp_viewport.height_);

          this.width_ = comp_viewport.width_;
          this.height_ = comp_viewport.height_;
        }

        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const a_world_pos = this.a_world_pos_;
        const a_tex_coord = this.a_tex_coord_;
        const a_tex_index = this.a_tex_index_;

        gl.useProgram(this.program_);
        gl.uniformMatrix4fv(this.u_vp_transform_, false, comp_viewport.transform_vp_);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ib_);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vb_);
        gl.vertexAttribPointer(a_world_pos, 3, gl.FLOAT, false, 24, 0);
        gl.vertexAttribPointer(a_tex_coord, 2, gl.FLOAT, false, 24, 12);
        gl.vertexAttribPointer(a_tex_index, 1, gl.FLOAT, false, 24, 20);
      }

      gl.bufferSubData(gl.ARRAY_BUFFER, 0, GBatchQuadV_XYZIUV);

      const num_bind_textures = bind_textures.length;
      gl.bindTexture(gl.TEXTURE_2D, bind_textures[0].GetTexture());
      for(let bi = 1; bi < num_bind_textures; ++bi) {
        gl.activeTexture(gl.TEXTURE0 + bi);
        gl.bindTexture(gl.TEXTURE_2D, bind_textures[bi].GetTexture());
      }
      gl.uniform1iv(s_sprite, bind_texture_indices);

      gl.drawElements(gl.TRIANGLES, num_draw * 6/*two polygon*/, gl.UNSIGNED_SHORT, 0);

      num_draw = 0;
      offset = 0;
      bind_textures.length = 0;
      bind_texture_indices.length = 0;
    }

    let scale = null;
    let rot = quat.create();
    let pos = null;
    let texcoord = null;
    let current_texture = null;
    let world_transform = mat4.create();
    let world_pos = vec3.create();
    let comp_rot = null;

    post_process.Begin();

    world.getEntities('Scale', 'Pos', 'Texture', 'Texcoord').forEach((function(entity) {
      current_texture = entity.getComponent('Texture').texture_;
      if(false === current_texture.IsRenderable()) {
        return;
      }

      ++num_draw;

      let texture_index = null;
      let num_bind_textures = bind_textures.length;
      for(let bi = 0; bi < num_bind_textures; ++bi) {
        if(bind_textures[bi] === current_texture) {
          texture_index = bi;
          break;
        }
      }

      if(null === texture_index) {
        if(GLimitTexture <= num_bind_textures) {
          Draw_.call(this);
        }

        bind_textures[num_bind_textures] = current_texture;
        bind_texture_indices[num_bind_textures] = num_bind_textures;
        texture_index = num_bind_textures;
      }

      scale = entity.getComponent('Scale').scale_;
      pos = entity.getComponent('Pos').pos_;
      texcoord = entity.getComponent('Texcoord').texcoord_;

      comp_rot = entity.getComponent('Rot');
      if(comp_rot) {
        quat.fromEuler(rot, comp_rot.rot_[0], comp_rot.rot_[1], comp_rot.rot_[2]);
        mat4.fromRotationTranslationScale(world_transform, rot, pos, scale);
      }
      else {
        mat4.fromRotationTranslationScale(world_transform, GQuatI, pos, scale);
      }

      for(let i = 0; i < 4; ++i) {
        vec3.transformMat4(world_pos, GQuadLocalPos[i], world_transform);

        GBatchQuadV_XYZIUV[offset++] = world_pos[0];
        GBatchQuadV_XYZIUV[offset++] = world_pos[1];
        GBatchQuadV_XYZIUV[offset++] = world_transform[13];
        GBatchQuadV_XYZIUV[offset++] = texcoord[i][0];
        GBatchQuadV_XYZIUV[offset++] = texcoord[i][1];
        GBatchQuadV_XYZIUV[offset++] = texture_index;
      }

      if(num_max_offset <= offset) {
        Draw_.call(this);
      }
    }).bind(this));

    if(0 === num_draw) {
      post_process.End();
      return;
    }

    Draw_.call(this);
    post_process.End();
  }
});
