var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();  //initialize our application 
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
mongoose.connect('mongodb+srv://kumush:yndal99@cluster0.lk3yo.mongodb.net/todo?retryWrites=true&w=majority');
// module.exports = db;

const itemSchema = {  //creating schema
    name: String,
}

const Item = mongoose.model('todolist', itemSchema);  //then mongoose model
const item1 = new Item({name: "heyyy"});


const d = [item1];
  
app.get("/", function(req, res){ //we use get method to get the request
    Item.find({}, function(err, f){
        if(f.length == 0){
            Item.insertMany(d, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Successfully saved items to Database"); 
                }
            });
            res.redirect("/");
        }else{
            res.render("list", {newListItem : f}); 
        }
    });
});

app.post("/", function(req, res){ //and we use post method when we need some modification and send response
    i = req.body.n;
    const item = new Item({
        name: i,
    });
    item.save();
    res.redirect("/");

});

app.post("/delete", function(req, res){
    Item.findByIdAndRemove (req.body.checkbox, function (err) {
        if(!err){
            console.log("Successfully deleted");
            res.redirect("/");
        }
    });
});
 

app.listen(3000, function(){
    console.log("listening on port 3000.");
});
