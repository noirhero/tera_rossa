// Copyright 2018 TAP, Inc. All Rights Reserved.

function EditorAnimMain() {
  'use strict';

  const scene = new Scene();
  scene.Start();

  const anim_entity = new CES.Entity();
  scene.world_.addEntity(anim_entity);

  const anim_info = {
    file_name: 'abcde',
  };

  const main_kit = new ControlKit();
  main_kit.addPanel({
    label: 'MAIN KIT',
    fixed: false,
    ratio: 120,
  }).addGroup()
    .addSubGroup()
    .addButton('OPEN_ANIMATION', function() {
      const input = document.createElement('input');
      input.type = 'file';
      input.addEventListener('change', function() {
        const file = input.files[0];
        anim_info.file_name = file.name;
        // const reader = new FileReader();
        // reader.onload = function(e) {
        //   e.preventDefault();
        //   const json_text = JSON.parse(reader.result);
        //   console.log(json_text);
        //
        //   const a = document.createElement('a');
        //   a.href = 'data:text/json;charset=utf-8,' + JSON.stringify(obj, null, '  ');
        //   a.download = 'a.json';
        //   a.style.display = 'none';
        //   a.click();
        //   reader.readAsText(file);
      }, false);
      input.click();
    })
    .addStringOutput(anim_info, 'file_name', {label: 'Curret File'});
}
