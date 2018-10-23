// Copyright 2018 TAP, Inc. All Rights Reserved.

var TileMap={};

TileMap.CanMove = function(tiles, dest_pos_) {
    'use strict';

    // let comp_tile = null;
    // tiles.forEach(function(entity) {
    //   comp_tile = entity.getComponent('Tile');
       
    //   let tile_size = GTile_size * 0.5;
    //   let pos_x1 = (comp_tile.tile_pos_[0] / GTileLength_x) * tile_size;  
    //   let pos_x2 = pos_x1 + tile_size;      
    //   let pos_y1 = (comp_tile.tile_pos_[1] / GTileLength_y) * tile_size; 
    //   let pos_y2 = pos_y1 + tile_size;      

    //   console.log(`tile: ${comp_tile.tile_pos_[0]} ${' / '} ${comp_tile.tile_pos_[1]} ${' pos: '} ${pos_x1} ${' , '} ${pos_x2}${' / '} ${pos_y1} ${' , '} ${pos_y2}`);

    //   if ((dest_pos_[0] >= pos_x1 && dest_pos_[0] <= pos_x2) &&
    //      (dest_pos_[1] >= pos_y1 && dest_pos_[1] <= pos_y2)) {
    //         if(comp_tile.collision_ === GTileCollisionType.Block)
    //         return true;
    //     }
        
    // });

    return true;
  };
  