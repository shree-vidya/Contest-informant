const express = require ("express");
const router = express.Router();
const Cultural = require("../models/cultural.js");
const middleware = require("../middleware")


router.get("/cultural",function(req,res){
    Cultural.find({},function(err,events){
        if(err){
        console.log(err)
        } else {
            res.render("cultural/index.ejs",{events:events})
        }
    })
})

router.post("/cultural", middleware.isloggedin, function(req,res){
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
    Cultural.create(newEvent,function(err,newlycreated){
        if(err) {
            console.log(err)
        } else {
            res.redirect("/cultural");
        }
    })    
})

router.get("/cultural/new", middleware.isloggedin, function(req,res){
    res.render("cultural/new.ejs")
})

router.get("/cultural/:id",function(req,res){
    Cultural.findById(req.params.id, function(err, foundevent){
		if(err){
			console.log(err)
		}else{
		res.render("cultural/show.ejs",{event: foundevent});
		}
	});
})

router.get("/cultural/:id/edit", middleware.checkculturalowner, function(req,res){
	
	Cultural.findById(req.params.id, function(err, foundevent ){
	if(err){
		res.redirect("/cultural")
	}else{
		res.render("cultural/edit.ejs",{event: foundevent})
	}	
	})	
});	

router.put("/cultural/:id", middleware.checkculturalowner, function(req,res){
	Cultural.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedevent){
		if(err){
			res.redirect("/cultural");
		} else {
			res.redirect("/cultural/"+ req.params.id)
		}
	})
})

router.delete("/cultural/:id", middleware.checkculturalowner, function(req, res){
    Cultural.findByIdAndRemove(req.params.id , function(err){
		if(err){
			console.log(err)
		} else{
			res.redirect("/cultural")
		}
	})
})

module.exports = router;