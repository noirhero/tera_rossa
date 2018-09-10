// Copyright 2018 TAP, Inc. All Rights Reserved.

const ComponentTurn = CES.Component.extend({
  name: 'Turn',
  init: function(is_player_turn) {
    this.is_player_turn_ = is_player_turn || true;
  }
});
