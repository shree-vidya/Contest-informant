var express = require ("express");
var router = express.Router();
var General = require("../models/general.js");
var middleware = require("../middleware")


router.get("/general",function(req,res){
    General.find({},function(err,events){
        if(err){
        console.log(err)
        } else {
            res.render("general/index.ejs",{events:events})
        }
    })
})

router.post("/general", middleware.isloggedin, function(req,res){
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
    General.create(newEvent,function(err,newlycreated){
        if(err) {
            console.log(err)
        } else {
            res.redirect("/general");
        }
    })    
})

router.get("/general/new", middleware.isloggedin, function(req,res){
    res.render("general/new.ejs")
})

router.get("/general/:id",function(req,res){
    General.findById(req.params.id, function(err, foundevent){
		if(err){
			console.log(err)
		}else{
		res.render("general/show.ejs",{event: foundevent});
		}
	});
})

router.get("/general/:id/edit", middleware.checkgeneralowner, function(req,res){
	
	General.findById(req.params.id, function(err, foundevent ){
	if(err){
		res.redirect("/general")
	}else{
		res.render("general/edit.ejs",{event: foundevent})
	}	
	})	
});	

router.put("/general/:id", middleware.checkgeneralowner, function(req,res){
	General.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedevent){
		if(err){
			res.redirect("/general");
		} else {
			res.redirect("/general/"+ req.params.id)
		}
	})
})

router.delete("/general/:id", middleware.checkgeneralowner, function(req, res){
    General.findByIdAndRemove(req.params.id , function(err){
		if(err){
			console.log(err)
		} else{
			res.redirect("/general")
		}
	})
})

module.exports = router;