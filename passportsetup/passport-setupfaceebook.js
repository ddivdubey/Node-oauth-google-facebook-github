const passport = require('passport');
const FacebookStraegy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    return done(null,id);
});

passport.use(new FacebookStraegy({
    clientID:process.env.FACEBOOK_APP_ID,
    clientSecret:process.env.FACEBOOK_APP_SCERET,
    callbackURL:process.env.FACEBOOK_CALLBACKURL,
    profileFields:['id','displayName','email','picture']   
},function(token,refreshToken,profile,done){
    console.log(profile);
    return done(null,profile);
}
));



/* copy in html if needed

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
 */