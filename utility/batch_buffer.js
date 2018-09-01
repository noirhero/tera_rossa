// Copyright 2018 TAP, Inc. All Rights Reserved.

const GNumBatch = 10;
const GBatchQuadV_XYZUV = new Float32Array(GNumBatch * 20/*xyz uv*/ * 4/*quad*/);
const GBatchQuadV_XYZIUV = new Float32Array(GNumBatch * 24/*xyz uv*/ * 4/*quad*/);
const GBatchQuadI = function() {
  const indices_ = new Uint16Array(GNumBatch * 6/*two polygon*/);

  let offset = 0;
  let offset_idx = 0;
  for(let i = 0; i < GNumBatch; ++i) {
    indices_[offset++] = offset_idx;
    indices_[offset++] = offset_idx + 1;
    indices_[offset++] = offset_idx + 2;
    indices_[offset++] = offset_idx + 2;
    indices_[offset++] = offset_idx + 1;
    indices_[offset++] = offset_idx + 3;

    offset_idx += 4/*quad*/;
  }
  return indices_;
}();
