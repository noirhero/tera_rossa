// Copyright 2018 TAP, Inc. All Rights Reserved.

class SceneGame extends Scene {
  constructor() {
    super();

    const context = this.context_;
    const world = this.world_;

    world.addSystem(new SystemViewport(context));
    this.world_.addSystem(new SystemAnimation());
    this.world_.addSystem(new SystemRenderSprite(context));

    const entity_viewport = new CES.Entity();
    entity_viewport.addComponent(new ComponentViewport());
    world.addEntity(entity_viewport);

    const entity_tile = new CES.Entity();
    entity_tile.addComponent(new ComponentScale(200, 200));
    entity_tile.addComponent(new ComponentPos());
    entity_tile.addComponent(new ComponentTexture('data/texture/dungeon_tile.png', context.GL));
    world.addEntity(entity_tile);

    this.DefaultContextStates_();
  }

  DefaultContextStates_() {
    const gl = this.context_.GL;

    gl.depthFunc(gl.GREATER);

    gl.disable(gl.CULL_FACE);
    gl.frontFace(gl.CW);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.clearColor(0.25, 0.25, 0.75, 1);
    gl.clearDepth(0);
  }

  ContextRestored_(event) {
    super.ContextRestored_(event);

    this.DefaultContextStates_();
  }
}
