// Copyright 2018 TAP, Inc. All Rights Reserved.

var TileMap={};

TileMap.CanMove = function(tiles, dest_pos_) {
    'use strict';

    // Convert tile path pos
    let tile_size = GTile_size * 0.5;
    let pos_x = parseInt((dest_pos_[0] + (GTileLength_x * tile_size)) / GTile_size);    
    let pos_y = -parseInt((dest_pos_[1] - (GTileLength_y * tile_size)) / GTile_size);

    // boundary 
    let pos_x1 = pos_x;
    let pos_x2 = pos_x; 
    let pos_y1 = pos_y;
    let pos_y2 = pos_y;
    //console.log(`:: pos: ${dest_pos_[0]} ${' / '} ${dest_pos_[1]} ${' tile: '} ${pos_x} ${' / '} ${pos_y}`);
    
    let collision_type;
    let comp_tile = null;
    tiles.some(function(entity) {
      comp_tile = entity.getComponent('Tile');       
      
      if(comp_tile.tile_pos_[0] === pos_x && comp_tile.tile_pos_[1] === pos_y){
        collision_type = comp_tile.collision_;
        //console.log(`tile: ${comp_tile.tile_pos_[0]} ${' / '} ${comp_tile.tile_pos_[1]}`);
        return true;
      }
    });

    console.log(`tilecollision: ${' : '} ${comp_tile.collision_}`);
    return collision_type !== GTileCollisionType.Block;
  };
  