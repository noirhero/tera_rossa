// Copright 2018 TAP, Inc. All Rights Reserved.

const SystemTurn = CES.System.extend({
  update: function() {
    const turn_entity = this.world.getEntities('Turn');
    if(0 === turn_entity.length) {
      return;
    }

    let pos = null;
    let dest_pos = null;
    let velocity = vec3.create();

    function CalculateSpeed_(entity) {
      pos = entity.getComponent('Pos').pos_;
      dest_pos = entity.getComponent('DestPos').dest_pos_;
      vec3.subtract(velocity, dest_pos, pos);
      return vec3.dot(velocity, velocity);
    }

    const turn_comp = turn_entity[0].getComponent('Turn');
    if(true === turn_comp.is_player_turn_) {
      this.world.getEntities('Player', 'Pos', 'DestPos').some(function(entity) {
        if(0.01 < CalculateSpeed_(entity)) {
          turn_comp.is_player_turn_ = false;
          return false;
        }

        return true;
      });
    }
    else {
      this.world.getEntities('Pos', 'DestPos').some(function(entity) {
        if(entity.getComponent('Player')) {
          return true;
        }
        else if(0.01 < CalculateSpeed_(entity)) {
          turn_comp.is_player_turn_ = true;
          return false;
        }

        return true;
      });
    }
  }
});
