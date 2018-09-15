// Copyright 2018 TAP, Inc. All Rights Reserved.

const GZeroV = vec3.create();
const GRightV = vec3.fromValues(1, 0, 0);
const GLeftV = vec3.fromValues(-1, 0, 0);
const GUpV = vec3.fromValues(0, 1, 0);
const GDownV = vec3.fromValues(0, -1, 0);
const GQuatI = quat.create();

const GQuadLocalPos = [
  vec3.fromValues(-0.5, 0.5, 0.0),
  vec3.fromValues(0.5, 0.5, 0.0),
  vec3.fromValues(-0.5, -0.5, 0.0),
  vec3.fromValues(0.5, -0.5, 0.0),
];

const GEmptyTexcoord = [
  vec2.fromValues(0.0, 1.0),
  vec2.fromValues(1.0, 1.0),
  vec2.fromValues(0.0, 0.0),
  vec2.fromValues(1.0, 0.0),
];

const GLimitTexture = 8; // iphone 5s, samsung galaxy note 3
