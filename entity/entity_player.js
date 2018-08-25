// Copyright TAP, Inc. All Rights Reserved.

const Entity_Player = CES.Entity.extend({
  init: function() {
    console.log('This player initialize.');

    this.addComponent(new Component_Pos2());
  }
});
