var express = require ("express");
var app = express();
var bodyParser = require ("body-parser");
var mongoose = require('mongoose');


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://shreevidya:shreevidya123@cluster0-o44xt.mongodb.net/test?retryWrites=true&w=majority", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("connected to DB")
});
mongoose.Promise = global.Promise;

var events = [{name: "Hackathon", venue: "MSRIT", date: "2020-05-11"},{name:"Coderush", venue: "BMSCE",  date: "2021-06-13"}]

app.get("/",function(req,res){
    res.render("basic")
})

app.get("/register",function(req,res){
	res.render("register.ejs")
})

app.get("/login",function(req,res){
	res.render("login.ejs");
})

app.get("/coding",function(req,res){
    res.render("coding/coding.ejs",{events:events})
})

app.post("/coding",function(req,res){
    var name = req.body.name;
    var venue = req.body.venue;
    var date = req.body.date;
    var newEvent = {name: name, venue:venue, date: date};
    events.push(newEvent);
    res.redirect("coding/coding");
})

app.get("/coding/new",function(req,res){
    res.render("coding/new.ejs")
})

app.listen(3000,function(){
	console.log("started!!!");
})