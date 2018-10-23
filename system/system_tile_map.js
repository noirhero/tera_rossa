// Copyright 2018 TAP, Inc. All Rihgts Reserved.

const SystemTileMap = CES.System.extend({
  init: function(context, world) {

    this.context = context;
    this.world = world;

    /**
     * 경로 설정
     *  Edge(시계방향)
     *  기준위치 => 0 : 상, y=0 | 1 : 우, x=size_x | 2 : 하, y=size+y | 3 : 좌, x=0
     *  가변위치 => 0 or 2 : 짝수면 x가 랜덤 | 1 or 3 : 홀수면 y가 랜덤
     *  방향성 => 0->2 : y++ | 1->3 : x-- | 2->0 : y-- | 3->1 : x++
     */

     let path_stack = [];

    let start_edge = Math.RangeRandomInt(0, 3);
    let end_edge = (start_edge + 2) % 4 // 맞은편을 구하기 위함

    // 시작 지점
    let random_start_x = Math.RangeRandomInt(0, GTileLength_x);
    let random_start_y = Math.RangeRandomInt(0, GTileLength_y);

    let start_path;
    switch(start_edge){
      case 0: start_path = {x : random_start_x, y : 0}; break;
      case 1: start_path = {x : GTileLength_x, y : random_start_y}; break;
      case 2: start_path = {x : random_start_x, y : GTileLength_y}; break;
      case 3: start_path = {x : 0, y : random_start_y}; break;
    }

    // 도착지점
    let random_end_x = Math.RangeRandomInt(0, GTileLength_x);
    let random_end_y = Math.RangeRandomInt(0, GTileLength_y);

    let end_path;
    switch(end_edge){
      case 0: end_path = {x : random_end_x, y : 0}; break;
      case 1: end_path = {x : GTileLength_x, y : random_end_y}; break;
      case 2: end_path = {x : random_end_x, y : GTileLength_y}; break;
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
        random_axis = Math.RangeRandomInt(0, 2);
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

    /**
     * 타일 속성 부여
     */
    let collision_type = GTileCollisionType.Block;
    for(let x=0; x <= GTileLength_x; x++){
      for(let y=0; y <= GTileLength_y; y++){

        // 계산된 경로를 돌면서 컴포넌트 설정 경로 인지 아닌지 판별
        collision_type = GTileCollisionType.Block;
        for(let ran=0; ran<path_stack.length; ran++){
          if(path_stack[ran].x === x && path_stack[ran].y === y){
            collision_type = GTileCollisionType.Path;
            break;
          }
        }

        if(collision_type !== GTileCollisionType.Path){
          let bonus_path = (Math.RangeRandomInt(0, GTile_BonusRandomMax) === 0);
          collision_type = bonus_path ? GTileCollisionType.BonusPath : GTileCollisionType.Block;
         //collision_type = GTileCollisionType.Block;
        }

        //console.log(`tile: ${x} ${' / '} ${y}${' / '} ${collision_type}`);
        const entity_tile = new CES.Entity();
        entity_tile.addComponent(new ComponentTile(x, y, collision_type));
        world.addEntity(entity_tile);
      }
    }


    /**
     * 타일 배치 작업
     */
    let comp_tile = null;
    this.world.getEntities('Tile').forEach(function(entity) {
      comp_tile = entity.getComponent('Tile');

      let pos_x = (comp_tile.tile_pos_[0] - (GTileLength_x / 2)) * GTile_size;
      let pos_y = (comp_tile.tile_pos_[1] - (GTileLength_y / 2)) * GTile_size;


      let texture_path;
      switch(comp_tile.collision_){
        case GTileCollisionType.Path : texture_path = 'data/texture/dungeon_tile_path.png'; break;
        case GTileCollisionType.Block : texture_path = 'data/texture/dungeon_tile_block.png'; break;
        case GTileCollisionType.BonusPath : texture_path = 'data/texture/dungeon_tile_bonuspath.png'; break;
        default : texture_path = 'data/texture/dungeon_tile.png'; break;
      }

      //console.log(`tile: ${comp_tile.tile_pos_[0]} ${' / '} ${comp_tile.tile_pos_[1]} ${','} ${comp_tile.collision_} ${'//'} ${texture_path} ${'//'} ${' pos: '} ${pos_x} ${' / '} ${-pos_y}`);
      entity.addComponent(new ComponentScale(GTile_size, GTile_size));
      entity.addComponent(new ComponentPos(pos_x, -pos_y, 999));
      entity.addComponent(new ComponentTexture(texture_path, context.GL));
      entity.addComponent(new ComponentTexcoord());
    });
  },

  update: function() {
  }
});
