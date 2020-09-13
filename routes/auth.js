var express 	= require ("express");
var router	    = express.Router();
var Coding      = require("../models/coding.js");
var passport    = require("passport");
var Users       = require("../models/user");

router.get("/",function(req,res){
    res.render("basic")
})

router.get("/signup",function(req,res){
	res.render("signup.ejs")
})

router.post("/signup",function(req,res){
	var newuser = new Users({username: req.body.username});
	Users.register(newuser, req.body.password, function(err, user){
		if(err){
            req.flash("error",err.message)
			return res.render("signup.ejs")
		}
		passport.authenticate("local")(req, res, function(){
			authenticated_user = 1;
			req.flash("success","Welcome to Contest Informant "+req.body.username );
			console.log(req.body.username );
			res.redirect("/");
		})
	})
})

router.get("/login",function(req,res){
	authenticated_user = 1;
	res.render("login.ejs");
})

router.post("/login", passport.authenticate("local",
	{
	 successRedirect: "/",
	failureRedirect: "/login"
	}),
	function(req,res){	
});

global.signup_auth = 0;
global.login_auth = 0;
global.authenticated_user = 1;


router.get('/google/login',function(req,res,next){
	login_auth = 1;
	signup_auth = 0;
	new_user = 0;
	next();
},passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/facebook/login',function(req,res,next){
	login_auth = 1;
	signup_auth = 0;
	new_user = 0;
	next();
},passport.authenticate('facebook', {
	scope: 'email'
}));

router.get('/google/signup',function(req,res,next){
	signup_auth = 1;
	login_auth = 0;
	new_user =0;
	next();
}, passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/facebook/signup',function(req,res,next){
	signup_auth = 1;
	login_auth = 0;
	new_user =0;
	next();
}, passport.authenticate('facebook', {
    scope: 'email'
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {	
	console.log(new_user);
	if(new_user && login_auth)
	{
	req.flash("error", "You need to sign up first!");
	authenticated_user = 0;
	res.redirect("/signup");
	}
	else
	if(!new_user && signup_auth)
	{	
		req.flash("error", "User already exist!");
		authenticated_user = 0;
		res.redirect("/signup");
	}
	else
	{	
		authenticated_user = 1;
		res.redirect('/');
	}
});

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {	
	console.log('arkuthawriut')
	console.log(new_user);
	console.log(login_auth)
	console.log(signup_auth)
	console.log(req)
	if(new_user && login_auth)
	{
	req.flash("error", "You need to sign up first!");
	authenticated_user = 0;
	res.redirect("/signup");
	}
	else
	if(!new_user && signup_auth)
	{	
		req.flash("error", "User already exist!");
		authenticated_user = 0;
		res.redirect("/signup");
	}
	else
	{	
		authenticated_user = 1;
		req.flash("success","Welcome to Contest Informant "+req.user.username );
		res.redirect('/');
	}
});


router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged You Out!");
	res.redirect("/");
});


module.exports = router;
