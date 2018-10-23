// Copright 2018 TAP, Inc. All Rights Reserved.

const SystemTurn = CES.System.extend({
  update: function() {
    const turn_entity = this.world.getEntities('Turn');
    if(0 === turn_entity.length) {
      return;
    }

    const turn_comp = turn_entity[0].getComponent('Turn');
    if(true === turn_comp.is_player_turn_) {
      this.world.getEntities('Player', 'DestPos').some(function(entity) {
        if(1 > entity.getComponent('DestPos').delta_) {
          turn_comp.is_player_turn_ = false;
          return true;
        }

        return false;
      });
    }
    else {
      this.world.getEntities('Pos', 'DestPos').some(function(entity) {
        if(entity.getComponent('Player')) {
          return false;
        }
        else if(1 > entity.getComponent('DestPos').delta_) {
          turn_comp.is_player_turn_ = true;
          return true;
        }

        return false;
      });
    }
  }
});
