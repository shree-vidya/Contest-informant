var express = require ("express");
var app = express();
var bodyParser = require ("body-parser");
var mongoose = require('mongoose');
var passport = require("passport");
var localstrategy = require("passport-local");
var methodoverride = require("method-override");
var flash = require("connect-flash");

var Coding = require("./models/coding.js");
var Users = require("./models/user.js");

var codingroutes = require("./routes/coding.js")
var authroutes = require("./routes/auth.js")


mongoose.connect("mongodb+srv://shreevidya:shreevidya123@cluster0-o44xt.mongodb.net/test?retryWrites=true&w=majority", {
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
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());


app.use(function(req ,res ,next ){
    res.locals.currentuser = req.user;
    res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(authroutes);
app.use(codingroutes);

app.listen(3000,function(err){
    if(err) {
        console.log(err)
    }
	console.log("started!!!");
})