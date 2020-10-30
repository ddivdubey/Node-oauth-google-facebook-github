const passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACKURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null,profile);
  }
));
