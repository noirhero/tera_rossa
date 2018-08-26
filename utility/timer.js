// Copyright TAP, Inc. All Rights Reserved.

class Timer {
  constructor() {
    this.delta_ = 0;
    this.delta_ms_ = 0;

    this.prev_ = Date.now();
  }

  Update() {
    const now = Date.now();
    this.delta_ms_ = now - this.prev_;
    this.delta_ = this.delta_ * 0.001;
    this.prev_ = now;
  }

  get Delta() {
    return this.delta_;
  }

  get DeltaMS() {
    return this.delta_ms_;
  }
}
