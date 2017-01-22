module.exports = (function() {
  'use strict';
  
  // config vars
  var base = './';
  
  var config = {
    usersDir: base + 'users.json',
    excludedBowerComponents: ['es5-shim', 'json3', 'bootstrap-sass', 'jquery']
  };
  
  return config;
})();
