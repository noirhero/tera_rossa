// Copright 2018 TAP, Inc. All Rights Reserved.

const SystemTurn = CES.System.extend({
  update: function() {
    const turn_entity = this.world.getEntities('Turn');
    if(!turn_entity) {
      return;
    }

    const turn_comp = turn_entity.getComponent('Turn');
    if(true === turn_comp.is_player_turn_) {\
    }
    else {
    }
  }
});
