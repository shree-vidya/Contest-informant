var express = require ("express");
var router = express.Router();
var Coding = require("../models/coding.js");
var middleware = require("../middleware")


router.get("/coding",function(req,res){
    Coding.find({},function(err,events){
        if(err){
        console.log(err)
        } else {
            res.render("coding/index.ejs",{events:events})
        }
    })
})

router.post("/coding", middleware.isloggedin, function(req,res){
    var name = req.body.name;
    var venue = req.body.venue;
    var date = req.body.date;
    var desc = req.body.description;
    var rl = req.body.registration_link;
    var author = {
		id: req.user._id,
		username: req.user.username
	}
    var newEvent = {name: name, venue:venue, date: date, description: desc, registration_link: rl, author:author};
    Coding.create(newEvent,function(err,newlycreated){
        if(err) {
            console.log(err)
        } else {
            res.redirect("/coding");
        }
    })    
})

router.get("/coding/new", middleware.isloggedin, function(req,res){
    res.render("coding/new.ejs")
})

router.get("/coding/:id",function(req,res){
    Coding.findById(req.params.id, function(err, foundevent){
		if(err){
			console.log(err)
		}else{
		res.render("coding/show.ejs",{event: foundevent});
		}
	});
})

router.get("/coding/:id/edit", middleware.checkowner, function(req,res){
	
	Coding.findById(req.params.id, function(err, foundevent ){
	if(err){
		res.redirect("/coding")
	}else{
		res.render("coding/edit.ejs",{event: foundevent})
	}	
	})	
});	

router.put("/coding/:id", middleware.checkowner, function(req,res){
	Coding.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedcamp){
		if(err){
			res.redirect("/coding");
		} else {
			res.redirect("/coding/"+ req.params.id)
		}
	})
})

router.delete("/coding/:id", middleware.checkowner, function(req, res){
    Coding.findByIdAndRemove(req.params.id , function(err){
		if(err){
			console.log(err)
		} else{
			res.redirect("/coding")
		}
	})
})

module.exports = router;