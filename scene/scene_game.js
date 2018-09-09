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

    const entity_tera = new CES.Entity();
    entity_tera.addComponent(new ComponentScale(60, 90));
    entity_tera.addComponent(new ComponentPos(100, 40));
    entity_tera.addComponent(new ComponentAnimState('data/animation/tera.json', 'idle'));
    entity_tera.addComponent(new ComponentTexture('data/sprite/tera.png', context.GL));
    entity_tera.addComponent(new ComponentTexcoord());
    world.addEntity(entity_tera);

    const entity_rossa = new CES.Entity();
    entity_rossa.addComponent(new ComponentScale(60, 90));
    entity_rossa.addComponent(new ComponentPos(-100, 40));
    entity_rossa.addComponent(new ComponentAnimState('data/animation/rossa.json', 'idle', 0, true));
    entity_rossa.addComponent(new ComponentTexture('data/sprite/rossa.png', context.GL));
    entity_rossa.addComponent(new ComponentTexcoord());
    world.addEntity(entity_rossa);

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
