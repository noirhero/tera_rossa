// Copyright TAP, Inc. All Rights Reserved.

class SceneGame extends Scene {
  constructor() {
    super();

    this.world_.addSystem(new SystemAnimation());
    this.world_.addSystem(new SystemRenderSprite(this.context_));
  }
}
