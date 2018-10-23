// Copyright 2018 TAP, Inc. All Rights Reserved.

const ComponentTile = CES.Component.extend({
  name: 'Tile',
  init: function(x, y, collision) {
    this.tile_pos_ = vec2.fromValues(x || 0, y || 0);
    this.collision_ = collision;    
    //this.tile_index = (x * size) + y; 
  }
});
