// Copyright 2018 TAP, Inc. All Rihgts Reserved.

const SystemTileMap = CES.System.extend({
  init: function(context, world) {
    
    this.context = context;    
    this.world = world;
    
    const tile_size = 100;
    const size_x = 8;
    const size_y = 12;

    let path_stack = [];

    /**
     * 경로 설정
     *  Edge(시계방향)
     *  기준위치 => 0 : 상, y=0 | 1 : 우, x=size_x | 2 : 하, y=size+y | 3 : 좌, x=0
     *  가변위치 => 0 or 2 : 짝수면 x가 랜덤 | 1 or 3 : 홀수면 y가 랜덤
     *  방향성 => 0->2 : y++ | 1->3 : x-- | 2->0 : y-- | 3->1 : x++
     */
    let start_edge = Math.RangeRandomInt(0, 3); 
    let end_edge = (start_edge + 2) % 4 // 맞은편을 구하기 위함    

    // 시작 지점
    let random_start_x = Math.RangeRandomInt(0, size_x); 
    let random_start_y = Math.RangeRandomInt(0, size_y); 

    let start_path;
    switch(start_edge){
      case 0: start_path = {x : random_start_x, y : 0}; break;
      case 1: start_path = {x : size_x, y : random_start_y}; break;
      case 2: start_path = {x : random_start_x, y : size_y}; break;
      case 3: start_path = {x : 0, y : random_start_y}; break;
    }

    // 도착지점
    let random_end_x = Math.RangeRandomInt(0, size_x); 
    let random_end_y = Math.RangeRandomInt(0, size_y);

    let end_path;
    switch(end_edge){
      case 0: end_path = {x : random_end_x, y : 0}; break;
      case 1: end_path = {x : size_x, y : random_end_y}; break;
      case 2: end_path = {x : random_end_x, y : size_y}; break;
      case 3: end_path = {x : 0, y : random_end_y}; break;
    }

    //경로 설정
    let locked_x = false;
    let locked_y = false;
    
    let weight_path;
    let cached_path = {x : start_path.x, y : start_path.y};    
    let direction_path = { x : end_path.x === start_path.x ? 0 : end_path.x > start_path.x ? 1 : -1,
                           y : end_path.y === start_path.y ? 0 : end_path.y > start_path.y ? 1 : -1};

    while(true){

      path_stack.push(cached_path);
      weight_path = path_stack[path_stack.length-1];

      locked_x = cached_path.x === end_path.x;
      locked_y = cached_path.y === end_path.y;
      if(locked_x && locked_y){
        break;
      }

      let random_axis = 0;
      if(locked_x == false && locked_y == false){
        random_axis = Math.RangeRandomInt(0, 1);
      }
      else{
        if(locked_x){
          random_axis = 1;
        }
      }
      if(random_axis === 0){
        cached_path = {x : weight_path.x+direction_path.x, y : weight_path.y};
      }
      else{
        cached_path = {x : weight_path.x, y : weight_path.y + direction_path.y};
      }
    }
    console.log(`start_edge : ${start_edge} ${random_start_x} ${random_start_y}`);
    console.log(`end_edge : ${end_edge} ${random_end_x} ${random_end_y}`);
    
    /**
     * 타일 속성 부여
     */    
    let isPath = false;
    for(let x=0; x <= size_x; x++){
      for(let y=0; y <= size_y; y++){
        
        // 경로 인지 아닌지 판별
        for(let ran=0; ran<path_stack.length; ran++){          
          isPath = path_stack[ran].x === x && path_stack[ran].y === y;
          if(isPath){
            break;
          } 
        }
        
        const entity_tile = new CES.Entity();
        entity_tile.addComponent(new ComponentTile(x, y, isPath));
        world.addEntity(entity_tile);
      }
    }


    /**
     * 타일 배치 작업
     */
    let comp_tile = null;
    this.world.getEntities('Tile').forEach(function(entity) {
      comp_tile = entity.getComponent('Tile');
      if(comp_tile.collision_)
      {
        let pos_x = (comp_tile.tile_pos_[0] - (size_x / 2)) * tile_size;        
        let pos_y = (comp_tile.tile_pos_[1] - (size_y / 2)) * tile_size; 

        entity.addComponent(new ComponentScale(tile_size, tile_size));
        entity.addComponent(new ComponentPos(pos_x, pos_y));
        entity.addComponent(new ComponentTexture('data/texture/dungeon_tile.png', context.GL));
        entity.addComponent(new ComponentTexcoord());
      }
    });    
  },

  update: function() {
  }
});
