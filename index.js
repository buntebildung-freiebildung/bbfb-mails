var config = require('./config');

var EmailTemplate = require('email-templates').EmailTemplate
var path = require('path')
var _ = require('lodash')
var Handlebars = require('handlebars')
var async = require('async')

var users = require(config.usersDir).mails
var templateDir = path.join(__dirname, 'templates', 'newsletter-first')
var template = new EmailTemplate(templateDir)

async.each(users, function (user, next) {
  template.render(user, function (err, result) {
    if (err) return next(err)
    // result.html
    // result.text
    // result.subject
  }).then(function (results) {
    console.log(results)
  })
}, function (err) {
  //
})
