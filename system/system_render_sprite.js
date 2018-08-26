// Copyright TAP, Inc. All Rights Reserved.

const SystemRenderSprite = CES.System.extend({
  init: function(context) {
    this.context_ = context;
    this.textures_ = {};
  },
  update: function() {
    const gl = this.context_.GL;

    const entity_viewports = this.world.getEntities('Viewport');
    if(0 === entity_viewports) {
      return;
    }

    const comp_viewport = entity_viewports[0].getComponent('Viewport');
    gl.viewport(0, 0, comp_viewport.width_, comp_viewport.height_);

    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
});
