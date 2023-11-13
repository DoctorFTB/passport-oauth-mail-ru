const util = require('util');
const { OAuth2Strategy, InternalOAuthError } = require('passport-oauth');

function Strategy(options, verify) {
  OAuth2Strategy.call(
    this,
    Object.assign(
      {},
      {
        tokenURL: 'https://oauth.mail.ru/token',
        authorizationURL: 'https://oauth.mail.ru/login',
      },
      options,
    ),
    verify,
  );

  this.name = 'mail';
}

util.inherits(Strategy, OAuth2Strategy);

function parseProfile(json) {
  const profile = {};

  profile.id = json.id;

  profile.username = json.nickname;
  profile.displayName = json.name;

  profile.name = {
    givenName: json.first_name,
    familyName: json.last_name,
  };

  profile.gender = json.gender;

  profile.emails = [{ value: json.email }];

  if (json.image) {
    profile.photos = [{ value: json.image }];
  }

  return profile;
}

Strategy.prototype.userProfile = function (accessToken, done) {
  const url = 'https://oauth.mail.ru/userinfo?access_token=' + accessToken;

  this._oauth2.get(url, '', function (err, body, res) {
    if (err) {
      return done(new InternalOAuthError('failed to fetch user profile', err));
    }

    try {
      const json = JSON.parse(body);

      const profile = parseProfile(json);
      profile.provider = 'mail';
      profile._raw = body;
      profile._json = json;

      done(null, profile);
    } catch (e) {
      done(e);
    }
  });
};

module.exports = Strategy;
