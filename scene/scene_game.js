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

    // const entity_tile = new CES.Entity();
    // entity_tile.addComponent(new ComponentScale(40, 40));
    // entity_tile.addComponent(new ComponentPos(0, 0, -100));
    // entity_tile.addComponent(new ComponentTexture('data/texture/dungeon_tile.png', context.GL));
    // entity_tile.addComponent(new ComponentTexcoord());
    // world.addEntity(entity_tile);

    const entity_tera = new CES.Entity();
    entity_tera.addComponent(new ComponentScale(60, 90));
    entity_tera.addComponent(new ComponentPos(100, 40));
    entity_tera.addComponent(new ComponentAnimState('data/animation/tera.json', 'idle-b'));
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

    const entity_skeleton = new CES.Entity();
    entity_skeleton.addComponent(new ComponentScale(90, 100));
    entity_skeleton.addComponent(new ComponentPos(130, 50));
    entity_skeleton.addComponent(new ComponentAnimState('data/animation/skeleton.json', 'idle'));
    entity_skeleton.addComponent(new ComponentTexture('data/sprite/skeleton.png', context.GL));
    entity_skeleton.addComponent(new ComponentTexcoord());
    world.addEntity(entity_skeleton);

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
