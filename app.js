require('dotenv').config()
const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const mongoose = require('mongoose');
const passport = require("passport");
const localstrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require('passport-facebook').Strategy;
const methodoverride = require("method-override");
const flash = require("connect-flash");

const Users = require("./models/user.js");
const Coding = require("./models/coding.js");
const Art = require("./models/art.js");
const Cultural = require("./models/cultural.js");
const General = require("./models/general.js");

const authroutes = require("./routes/auth.js")
const codingroutes = require("./routes/coding.js")
const artroutes = require("./routes/art.js")
const culturalroutes = require("./routes/cultural.js")
const generalroutes = require("./routes/general.js")

mongoose.connect("mongodb+srv://shreevidya:"+process.env.MONGO_DB_PASSWORD+"@cluster0-o44xt.mongodb.net/test?retryWrites=true&w=majority", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("connected to DB")
});
mongoose.Promise = global.Promise;


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodoverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "once again jimmy wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(Users.authenticate()));

global.new_user = 0;

passport.use(
  new GoogleStrategy({
    callbackURL: '/google/redirect',
      clientID: '769708276592-rhdk237rqa3f12lbi2ancnroajkmvrl5.apps.googleusercontent.com',
      clientSecret: 'xRqp4l5DVU-QB7Crjuri0Ges'
    }, (accessToken, refreshToken, profile, done) => {
      console.log('passport callback function fired:');
      Users.findOne({password: profile.id}).then((currentUser) => {
        if(currentUser){
            // console.log('user is: ', currentUser);
            done(null, currentUser)
        } else {
            new_user = 1;         
              new Users({
                password: profile.id,
                username: profile.displayName
            }).save().then((newUser) => {
                // console.log('created new user: ', newUser);
                done(null, newUser);
            });
        }
    });
})
);

passport.use(
  new FacebookStrategy({
      clientID: '640547306831821',
      clientSecret: '15098f1cf4d78809fee01f443325f57b',
      callbackURL: 'https://contest-informant.herokuapp.com/facebook/redirect'
    }, (accessToken, refreshToken, profile, done) => {
      console.log('passport callback function fired:');
      Users.findOne({password: profile.id}).then((currentUser) => {
        if(currentUser){
            // console.log('user is: ', currentUser);
            done(null, currentUser)
        } else {
            new_user = 1; 
              new Users({
                password: profile.id,
                username: profile.displayName
            }).save().then((newUser) => {
                // console.log('created new user: ', newUser);
                done(null, newUser);
            });
            
               
        }
    });
})
);

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());


app.use(function(req ,res ,next ){
    res.locals.currentuser = req.user;
    res.locals.authenticated_user = authenticated_user;
    res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(authroutes);
app.use(codingroutes);
app.use(artroutes);
app.use(culturalroutes);
app.use(generalroutes);


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
})