// Copyright TAP, Inc. All Rights Reserved.

const SystemRenderSprite = CES.System.extend({
  init: function(context) {
    this.context_ = context;
    this.textures_ = {};
  },
  update: function(dt) {
    const gl = this.context_.GL;

    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    gl.viewport(0, 0, width, height);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.GREATER);

    gl.disable(gl.CULL_FACE);
    gl.frontFace(gl.CW);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.clearColor(0.25, 0.25, 0.75, 1);
    gl.clearDepth(0);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
});
