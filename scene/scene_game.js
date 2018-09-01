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
    entity_tile.addComponent(new ComponentScale(40, 40));
    entity_tile.addComponent(new ComponentPos(0, 0, -100));
    entity_tile.addComponent(new ComponentTexture('data/texture/dungeon_tile.png', context.GL));
    entity_tile.addComponent(new ComponentTexcoord());
    world.addEntity(entity_tile);

    const entity_man = new CES.Entity();
    entity_man.addComponent(new ComponentScale(60, 90));
    entity_man.addComponent(new ComponentPos(0, 40));
    entity_man.addComponent(new ComponentAnimState('data/animation/man.json', 'idle-b'));
    entity_man.addComponent(new ComponentTexture('data/sprite/man.png', context.GL));
    entity_man.addComponent(new ComponentTexcoord());
    world.addEntity(entity_man);

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
