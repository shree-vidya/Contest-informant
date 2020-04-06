var Coding = require("../models/coding.js");
var middlewareobj = {};


middlewareobj.checkowner =  function(req, res, next){
	if(req.isAuthenticated()){
		Coding.findById(req.params.id, function(err, foundevent ){
	if(err){
        req.flash("error","Event not found");
		res.redirect("back");
	} else {
		if(foundevent.author.id.equals(req.user._id)){
			return next();
		} else {
            req.flash("error","You don't have permission to do that");
			res.redirect("back")
		}
	}	
	});
	} else{
        req.flash("error","You need to be logged in to do that ");
	    res.redirect("back")		
	}
}

middlewareobj.isloggedin =  function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
        req.flash("error","You need to be logged in to do that");
        res.redirect("/login");
    }
}

module.exports= middlewareobj;