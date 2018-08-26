// Copyright 2018 TAP, Inc. All Rights Reserved.

function ReadFile(url, callback) {
  'use strict';

  let request_ = null;

  function StateChange_() {
    if(4 === request_.readyState) {
      if(200 === request_.status || request_.response) {
        callback(request_.response);
        request_ = null;
      }
    }
  }

  request_ = new XMLHttpRequest();
  request_.open('GET', url, true);
  request_.onreadystatechange = StateChange_;
  request_.send(null);
}
