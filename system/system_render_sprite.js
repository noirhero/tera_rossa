// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemRenderSprite = CES.System.extend({
  init: function(context) {
    const gl = context.GL;

    this.vs_ = context.CreateShader([
      'attribute vec3 world_pos;',
      'attribute vec2 tex_coord;',
      'attribute float tex_index;',

      'uniform mat4 vp_transform;',

      'varying vec2 out_tex_coord;',
      'varying float out_tex_index;',

      'void main() {',
      ' gl_Position = vp_transform * vec4(world_pos, 1.0);',
      ' out_tex_coord = tex_coord;',
      ' out_tex_index = tex_index;',
      '}',
    ].join('\n'), gl.VERTEX_SHADER);

    this.gl_ = gl;
  },
  update: function() {
    const gl = this.gl_;
    const world = this.world;

    const entity_viewports = world.getEntities('Viewport');
    if(0 === entity_viewports) {
      return;
    }

    const comp_viewport = entity_viewports[0].getComponent('Viewport');
    gl.viewport(0, 0, comp_viewport.width_, comp_viewport.height_);

    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    world.getEntities('Scale2', 'Pos2', 'Texture').forEach(function(entity) {

    });
  }
});
