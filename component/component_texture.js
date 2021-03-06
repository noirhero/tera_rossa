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

  this.renderable_ = true;

  this.IsRenderable = function() {
    return (null !== image_ || false === this.renderable_) ? false : true;
  };

  this.SetRenderable = function(flag) {
    this.renderable_ = flag;
  };

  this.GetTexture = function() {
    return texture_;
  };
}

const ComponentTexture = CES.Component.extend({
  name: 'Texture',
  init: function(url, gl, renderable) {
    let texture = GTextures[url];
    if(!texture) {
      GTextures[url] = texture = new Texture(url, gl);

      if(undefined !== renderable) {
        texture.renderable_ = renderable;
      }
    }

    this.texture_ = texture;
  }
});
