// Copyright 2018 TAP, Inc. All Rights Reserved.

var TileMap={};

TileMap.CanMove = function(tiles, dest_pos_) {
    'use strict';

    let isBlock;
    let comp_tile = null;
    tiles.forEach(function(entity) {
      comp_tile = entity.getComponent('Tile');
       
      let pos_x1 = (comp_tile.tile_pos_[0] - (GTileLength_x / 2)) * GTile_size;  
      let pos_x2 = pos_x1 + GTile_size;      
      let pos_y1 = (comp_tile.tile_pos_[1] - (GTileLength_y / 2)) * GTile_size; 
      let pos_y2 = pos_y1 + GTile_size;      

      //console.log(`tile: ${dest_pos_[0]} ${' / '} ${dest_pos_[1]} ${' pos: '} ${pos_x1} ${' , '} ${pos_x2}${' / '} ${pos_y1} ${' , '} ${pos_y2}`);

      if ((dest_pos_[0] >= pos_x1 && dest_pos_[0] <= pos_x2) &&
         (dest_pos_[1] >= pos_y1 && dest_pos_[1] <= pos_y2)) {
            isBlock = comp_tile.collision_ === GTileCollisionType.Block;
        }
    });

    return !isBlock;
  };
  