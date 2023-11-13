# passport-oauth-mail-ru

[Passport](http://passportjs.org/) strategy for authenticating with [Mail](http://mail.ru) using the OAuth 2.0 API.

This module lets you authenticate using Mail in your Node.js applications.

## Install

```bash
$ npm install passport-oauth-mail-ru
```

## Usage

#### Create an Application

Before using `passport-oauth-mail-ru`, you must register an application with Mail.

#### Configure Strategy

```js
var MailStrategy = require('passport-oauth-mail-ru');

passport.use(new MailStrategy({
    clientID: process.env['MAIL_RU_APP_ID'],
    clientSecret: process.env['MAIL_RU_APP_SECRET'],
    callbackURL: "http://example.com/auth/mail/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ mailId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'mail'` strategy, to authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/) application:

```js
app.get('/auth/mail',
  passport.authenticate('mail'));

app.get('/auth/mail/callback', 
  passport.authenticate('mail', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2023 FTB_lag
