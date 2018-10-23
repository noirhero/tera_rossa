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
const GMoveEpsilon = 1;

const GTile_size = 100;
const GTileLength_x = 8;
const GTileLength_y = 12;
const GTile_BonusRandomMax = 5;
const GTileCollisionType = {Path: 1, Block: 2, BonusPath: 3};