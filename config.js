module.exports = (function() {
  'use strict';
  
  // config vars
  var base = './';
  
  var config = {
    usersDir: base + 'users.json',
    distDir: base + 'dist/'
  };
  
  return config;
})();
