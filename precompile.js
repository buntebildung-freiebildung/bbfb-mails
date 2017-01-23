var config = require('./config');

var EmailTemplate = require('email-templates').EmailTemplate
var path = require('path')
var Handlebars = require('handlebars')
var async = require('async')
var fs = require('fs')

var users = require(config.usersDir).mails
var templateDir = path.join(__dirname, 'templates', 'newsletter-first')
var template = new EmailTemplate(templateDir)
var i = 0

// additional function for handlebar templates (conditional if)
Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

async.each(users, function (user, next) {
    template.render(user, function (err, result) {
      // early return if error
      if (err) return next(err)
      // otherwise compile template and save
      fs.writeFile(config.distDir + 'result-' + i + '.html', result.html, function (err) {
        if (err) return console.log(err)
      })
      // compile text version
      fs.writeFile(config.distDir + 'result-' + i + '.txt', result.text, function (err) {
        if (err) return console.log(err)
      })
      // iterate
      i = i + 1
    })
  },
  function (err) {
    return console.log(err)
  }
)
