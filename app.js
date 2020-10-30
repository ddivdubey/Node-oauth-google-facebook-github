require('dotenv').config()
const express = require('express')
const app = express()
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passportsetup/passport-setup');
require('./passportsetup/passport-setupfaceebook');
require('./passportsetup/passport-setupgithub');

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

app.set('view engine','ejs')
app.use(express.static(__dirname+'/public'));

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get('/', (req, res) => res.render('index.ejs'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))






//----------------------------------Google oauth---------------------------
// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);
// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) =>{
    res.render("home.ejs",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})


//  ------------------------Facebook auth----------------------------------
app.get('/facebook',passport.authenticate('facebook',{scope:['email']}));

// facebook callback
app.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good1');
  }
);
// redirect
app.get('/good1', isLoggedIn, (req, res) =>{
  res.render("facebook.ejs",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})


// // ----------------------- github oauth--------------------
app.get('/github',passport.authenticate('github',{scope:['profile','email']}));

app.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good3');
  });

app.get('/good3',isLoggedIn,(req,res)=>{
  res.render("github.ejs",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.profileUrl});
})




//-------------------------Common logout-----------------
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(3000, () =>{
     console.log(`Example app listening on port ${3000}!`)
});