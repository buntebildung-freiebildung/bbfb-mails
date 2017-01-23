var config = require('./config');

var EmailTemplate = require('email-templates').EmailTemplate
var path = require('path')
var Handlebars = require('handlebars')
var async = require('async')
var fs = require('fs')
var nodemailer = require('nodemailer')

var users = require(config.usersDir).mails
var templateDir = path.join(__dirname, 'templates', 'newsletter-first')
var template = new EmailTemplate(templateDir)

// additional function for handlebar templates (conditional if)
Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// Prepare nodemailer transport object
var transport = nodemailer.createTransport(config.smtp)

async.each(users, function (user, next) {
    template.render(user, function (err, result) {
      // early return if error
      if (err) return next(err)
      // otherwise send mails
      transport.sendMail({
        from: config.from,
        to: user.mail,
        subject: config.subject,
        html: result.html,
        text: result.text
      }, function (err, responseStatus) {
        // early return if error
        if (err) return next(err)
        // otherwise
        next(null, responseStatus.message)
      })
    })
  },
  function (err) {
    return console.log(err)
  }
)
