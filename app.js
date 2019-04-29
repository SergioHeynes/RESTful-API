//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

/*--------------------------------------------------------------
Connect with the Database and set the Schema and Model
--------------------------------------------------------------*/

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

// Schema
const articleSchema = {
    title: String,
    content: String
};

// Model
const Article = mongoose.model("Article", articleSchema);


/*--------------------------------------------------------------
REED (GET) THE ARTICLES FROM THE DABASE
--------------------------------------------------------------*/
app.get("/articles", function(req, res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
});

/*--------------------------------------------------------------
WRITE (POST) THE ARTICLES FROM THE DABASE /MAKE REQUEST TROUGHT POSTMAN AND SAVE IT INTO OUR MONGO DB
--------------------------------------------------------------*/
app.post("/articles", function(req, res){
    //console.log(req.body.title);
    //console.log(req.body.content);

    const newArticle = new Article({
        title:  req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if (!err) {
            res.send("Successfully added new article.");
        } else {
            res.send(err);
        }
    });
});


/*--------------------------------------------------------------
DELETE ARTICLES FROM THE DABASE 
--------------------------------------------------------------*/
app.delete("/articles", function(req, res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles.")
        } else {
            res.send(err);
        }
    });
});







//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});