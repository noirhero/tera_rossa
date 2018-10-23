// Copyright 2018 TAP, Inc. All Rights Reserved.

var TileMap={};

var StartPosition;
var EndPosition;

TileMap.SetPosition = function(start_pos_, end_pos_) {
  'use strict';

  this.StartPosition = start_pos_;
  this.EndPosition = end_pos_;
}

TileMap.GetStartPosition = function() {
  'use strict';
  
  return TileMap.ConvertToRealPosition(this.StartPosition);
};

TileMap.GetEndPosition = function() {
  'use strict';

  return TileMap.ConvertToRealPosition(this.EndPosition);
};

TileMap.ConvertToTilePosition = function(pos) {
  'use strict';
  
  let tile_size = GTile_size * 0.5;
  let pos_x = parseInt((pos[0] + (GTileLength_x * tile_size)) / GTile_size);    
  let pos_y = parseInt((pos[1] - (GTileLength_y * tile_size)) / GTile_size);
  
  let pos_ = {x : pos_x, y : -pos_y};
  return pos_;
}

TileMap.ConvertToRealPosition = function(pos) {
  'use strict';
  
  let pos_x = (pos[0] - (GTileLength_x * 0.5)) * GTile_size;        
  let pos_y = (pos[1] - (GTileLength_y * 0.5)) * GTile_size; 
  
  let pos_ = {x : pos_x, y : -pos_y};
  return pos_;
}

TileMap.CanMove = function(tiles, dest_pos_) {
    'use strict';

    // Convert tile path pos
    let position = TileMap.ConvertToTilePosition(dest_pos_);
    
    let collision_type = GTileCollisionType.Block;
    let comp_tile = null;
    tiles.some(function(entity) {
      comp_tile = entity.getComponent('Tile');       
      
      if(comp_tile.tile_pos_[0] === position.x && comp_tile.tile_pos_[1] === position.y){
        collision_type = comp_tile.collision_;
        //console.log(`tile: ${comp_tile.tile_pos_[0]} ${' / '} ${comp_tile.tile_pos_[1]}`);
        return true;
      }
    });

    //console.log(`tilecollision: ${' : '} ${comp_tile.collision_}`);
    return collision_type !== GTileCollisionType.Block;
  };
  