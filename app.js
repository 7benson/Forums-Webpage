//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "Authors and editors in the humanities know that journals are more likely to accept scholarly essays with strong introductions and that such essays are more likely to influence academic conversations. Yet from our experiences as journal editors and authors, we also know that writers often struggle with introductions.";
const aboutContent = " This Website is an idea born out of boredom to address the young researcher's research journals of Indian Institute of Technology Palakkad in such a way that it reaches the students looking forward in a research career with similar fields of interest.";
const contactContent = "Contact me at +91 9 * * * * * * * * * and at * * * * * * * * @smail.iitpkd.ac.in";

const app = express();
const posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{
    homeStartingContent:homeStartingContent,
    posts : posts

  });
});

app.get("/about",function(req,res){
  res.render("about",{homeStartingContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{homeStartingContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
    let post = {
      title :req.body.postTitle,
      content :req.body.postBody
    };
    posts.push(post);

    res.redirect("/");

});

app.get("/posts/:postName",function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if(storedTitle === requestedTitle){

      res.render("post",{postTitle:post.title,postContent:post.content})
    }else{
      console.log("Not a Match");
    }
  });



});


app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
