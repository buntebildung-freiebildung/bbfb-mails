module.exports = (function() {
  'use strict';
  
  // config vars
  var base = './';
  
  var config = {
    usersDir: base + 'users.json',
    distDir: base + 'dist/',
    subject: 'Das ist ein Betreff',
    from: 'Initiative Bunte Bildung - Freie Bildung <info@buntebildung-freiebildung.de>',
    smtp: {
      host: 'smtp.sample.com',
      port: 465,
      secure: true,
      auth: {
        user: 'user',
        pass: 'pass'
      }
    }
  
  return config;
})();
