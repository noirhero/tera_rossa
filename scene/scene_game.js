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
    world.addSystem(new SystemInputTouch());
    world.addSystem(new SystemMovement());
    world.addSystem(new SystemTurn());
    world.addSystem(new SystemAI());
    world.addSystem(new SystemSoundBGM());
    world.addSystem(new SystemTileMap(context, world));
    world.addSystem(new SystemSoundListener());
    world.addSystem(new SystemMoveSoundEffect());

    let start_pos = TileMap.GetStartPosition();
    let end_pos = TileMap.GetEndPosition();

    const entity_viewport = new CES.Entity();
    entity_viewport.addComponent(new ComponentViewport());
    entity_viewport.addComponent(new ComponentTurn());
    entity_viewport.addComponent(new ComponentSoundBGM('data/sound/quiet_hill'));
    world.addEntity(entity_viewport);

    const entity_arrow = new CES.Entity();
    entity_arrow.addComponent(new ComponentScale(60, 60));
    entity_arrow.addComponent(new ComponentRot(0, 0, 180));
    entity_arrow.addComponent(new ComponentPos(0, 0));
    entity_arrow.addComponent(new ComponentTexture('data/texture/arrow.png', context.GL, false));
    entity_arrow.addComponent(new ComponentTexcoord());
    world.addEntity(entity_arrow);

    const entity_tera = new CES.Entity();
    entity_arrow.addComponent(new ComponentArrow());
    entity_tera.addComponent(new ComponentScale(60, 90));
    entity_tera.addComponent(new ComponentPos(end_pos.x, end_pos.y));
    //entity_tera.addComponent(new ComponentDestPos(end_pos.x, end_pos.y));
    entity_tera.addComponent(new ComponentAnimState('data/animation/tera.json', 'idle'));
    entity_tera.addComponent(new ComponentTexture('data/sprite/tera.png', context.GL));
    entity_tera.addComponent(new ComponentTexcoord());
    world.addEntity(entity_tera);

    const entity_rossa = new CES.Entity();
    entity_rossa.addComponent(new ComponentPlayer());
    entity_rossa.addComponent(new ComponentScale(60, 90));
    entity_rossa.addComponent(new ComponentPos(start_pos.x, start_pos.y));
    entity_rossa.addComponent(new ComponentDestPos(start_pos.x, start_pos.y));
    entity_rossa.addComponent(new ComponentAnimState('data/animation/rossa.json', 'idle', 0, true));
    entity_rossa.addComponent(new ComponentTexture('data/sprite/rossa.png', context.GL));
    entity_rossa.addComponent(new ComponentTexcoord());
    world.addEntity(entity_rossa);

    const entity_sorcerer = new CES.Entity();
    entity_sorcerer.addComponent(new ComponentScale(60, 85));
    entity_sorcerer.addComponent(new ComponentPos(end_pos.x, end_pos.y));
    entity_sorcerer.addComponent(new ComponentDestPos(end_pos.x, end_pos.y));
    entity_sorcerer.addComponent(new ComponentAnimState('data/animation/sorcerer.json', 'idle'));
    entity_sorcerer.addComponent(new ComponentTexture('data/sprite/sorcerer.png', context.GL));
    entity_sorcerer.addComponent(new ComponentTexcoord());
    entity_sorcerer.addComponent(new ComponentSoundEffect('data/sound/laugh_sorcerer'));
    world.addEntity(entity_sorcerer);

    const entity_gameover = new CES.Entity();
    entity_gameover.addComponent(new ComponentScale(256, 256));
    entity_gameover.addComponent(new ComponentPos(0, 0, -999));
    entity_gameover.addComponent(new ComponentTexcoord());
    entity_gameover.addComponent(new ComponentGameover());
    let gameover_texture = new ComponentTexture('data/texture/gameover.png', context.GL);
    gameover_texture.texture_.SetRenderable(false);
    entity_gameover.addComponent(gameover_texture);
    world.addEntity(entity_gameover);

    this.DefaultContextStates_();
  }

  DefaultContextStates_() {
    const gl = this.context_.GL;

    gl.depthFunc(gl.GREATER);

    gl.disable(gl.CULL_FACE);
    gl.frontFace(gl.CW);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.clearColor(0.12, 0.12, 0.12, 1);
    gl.clearDepth(0);

    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
  }

  ContextRestored_(event) {
    super.ContextRestored_(event);

    this.DefaultContextStates_();
  }
}
