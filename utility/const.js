// Copyright 2018 TAP, Inc. All Rights Reserved.

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
