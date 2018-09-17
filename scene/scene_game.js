// Copyright 2018 TAP, Inc. All Rights Reserved.

class SceneGame extends Scene {
  constructor() {
    super();

    const context = this.context_;
    const world = this.world_;

    world.addSystem(new SystemViewport(context));
    world.addSystem(new SystemAnimation());
    world.addSystem(new SystemRenderSprite(context));
    world.addSystem(new SystemInputKeydown());
    world.addSystem(new SystemMovement());
    world.addSystem(new SystemTurn());
    world.addSystem(new SystemAI());
    //world.addSystem(new SystemSoundBGM());
    world.addSystem(new SystemSoundListener());
    world.addSystem(new SystemMoveSoundEffect());

    const entity_viewport = new CES.Entity();
    entity_viewport.addComponent(new ComponentViewport());
    entity_viewport.addComponent(new ComponentTurn());
    entity_viewport.addComponent(new ComponentSoundBGM('data/sound/quiet_hill'));
    world.addEntity(entity_viewport);

    const entity_tera = new CES.Entity();
    entity_tera.addComponent(new ComponentScale(60, 90));
    entity_tera.addComponent(new ComponentPos(100, 40));
    entity_tera.addComponent(new ComponentDestPos(100, 40));
    entity_tera.addComponent(new ComponentAnimState('data/animation/tera.json', 'idle'));
    entity_tera.addComponent(new ComponentTexture('data/sprite/tera.png', context.GL));
    entity_tera.addComponent(new ComponentTexcoord());
    world.addEntity(entity_tera);

    const entity_rossa = new CES.Entity();
    entity_rossa.addComponent(new ComponentPlayer());
    entity_rossa.addComponent(new ComponentScale(60, 90));
    entity_rossa.addComponent(new ComponentPos(-100, 40));
    entity_rossa.addComponent(new ComponentDestPos(-100, 40));
    entity_rossa.addComponent(new ComponentAnimState('data/animation/rossa.json', 'idle', 0, true));
    entity_rossa.addComponent(new ComponentTexture('data/sprite/rossa.png', context.GL));
    entity_rossa.addComponent(new ComponentTexcoord());
    world.addEntity(entity_rossa);

    const entity_sorcerer = new CES.Entity();
    entity_sorcerer.addComponent(new ComponentScale(60, 85));
    entity_sorcerer.addComponent(new ComponentPos(140, 38));
    entity_sorcerer.addComponent(new ComponentDestPos(140, 38));
    entity_sorcerer.addComponent(new ComponentAnimState('data/animation/sorcerer.json', 'idle'));
    entity_sorcerer.addComponent(new ComponentTexture('data/sprite/sorcerer.png', context.GL));
    entity_sorcerer.addComponent(new ComponentTexcoord());
    entity_sorcerer.addComponent(new ComponentSoundEffect('data/sound/laugh_sorcerer', 140, 38));
    world.addEntity(entity_sorcerer);

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
