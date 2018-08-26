// Copyright 2018 TAP, Inc. All Rights Reserved.

var GTextures = {};

function Texture(url, gl) {
  'use strict';

  let texture_ = gl.createTexture();
  let image_ = new Image();

  function OnLoadImage_() {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture_);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image_);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);

    image_ = null;
  }

  image_.onload = OnLoadImage_;
  image_.src = url;
}

const ComponentTexture = CES.Component.extend({
  init: function(url, gl) {
    let texture = GTextures[url];
    if(!texture) {
      GTextures[url] = texture = new Texture(url, gl);
    }
    this.texture_ = texture;
  }
});
