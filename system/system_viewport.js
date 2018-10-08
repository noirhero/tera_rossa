// Copyright 2018 TAP, Inc. All Rights Reserved.

const SystemViewport = CES.System.extend({
  init: function(context) {
    this.canvas_ = context.Canvas;

  },
  update: function() {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const half_width = width * 0.5;
    const half_height = height * 0.5;

    const canvas = this.canvas_;
    if(width !== canvas.width) {
      //alert(`${document.documentElement.clientLeft}, ${document.documentElement.clientTop}, ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}`)
      canvas.width = width;
    }
    if(height !== canvas.height) {
      canvas.height = height;
      //alert(`${document.documentElement.clientLeft}, ${document.documentElement.clientTop}, ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}`)
    }

    let comp_viewport = null;
    this.world.getEntities('Viewport').forEach(function(entity) {
      comp_viewport = entity.getComponent('Viewport');

      vec3.add(comp_viewport.target_, comp_viewport.pos_, comp_viewport.dir_);
      mat4.lookAt(comp_viewport.transform_view_, comp_viewport.pos_, comp_viewport.target_, comp_viewport.up_);

      comp_viewport.width_ = width;
      comp_viewport.height_ = height;
      mat4.ortho(comp_viewport.transform_projection_, -half_width, half_width, -half_height, half_height, comp_viewport.z_near_, comp_viewport.z_far_);

      mat4.multiply(comp_viewport.transform_vp_, comp_viewport.transform_view_, comp_viewport.transform_projection_);
    });
  }
});
