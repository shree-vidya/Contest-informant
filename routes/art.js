var express = require ("express");
var router = express.Router();
var Art = require("../models/art.js");
var middleware = require("../middleware")


router.get("/art",function(req,res){
    Art.find({},function(err,events){
        if(err){
        console.log(err)
        } else {
            res.render("art/index.ejs",{events:events})
        }
    })
})

router.post("/art", middleware.isloggedin, function(req,res){
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
    Art.create(newEvent,function(err,newlycreated){
        if(err) {
            console.log(err)
        } else {
            res.redirect("/art");
        }
    })    
})

router.get("/art/new", middleware.isloggedin, function(req,res){
    res.render("art/new.ejs")
})

router.get("/art/:id",function(req,res){
    Art.findById(req.params.id, function(err, foundevent){
		if(err){
			console.log(err)
		}else{
		res.render("art/show.ejs",{event: foundevent});
		}
	});
})

router.get("/art/:id/edit", middleware.checkartowner, function(req,res){
	
	Art.findById(req.params.id, function(err, foundevent ){
	if(err){
		res.redirect("/art")
	}else{
		res.render("art/edit.ejs",{event: foundevent})
	}	
	})	
});	

router.put("/art/:id", middleware.checkartowner, function(req,res){
	Art.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedevent){
		if(err){
			res.redirect("/art");
		} else {
			res.redirect("/art/"+ req.params.id)
		}
	})
})

router.delete("/art/:id", middleware.checkartowner, function(req, res){
    Art.findByIdAndRemove(req.params.id , function(err){
		if(err){
			console.log(err)
		} else{
			res.redirect("/art")
		}
	})
})

module.exports = router;