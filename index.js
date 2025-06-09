const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log("Application Is Active 👍");
});

app.get("", (req,res)=>{
    res.render("login.ejs")
})
app.get("/home", (req, res) => {
    res.render("home.ejs")
});

app.get("/preview/:id", (req,res)=>{
    let id = req.params.id
    res.render("preview.ejs", {id: id})
})
app.get("/home/courses", (req,res)=>{
   res.render("courses.ejs")    
})
app.get("/courses/:class", (req, res)=>{
    res.render("content.ejs")
})
app.get("/courses/:class/:subject", (req,res)=>{
    const stuClass = req.params.class;
    const stuSubject = req.params.subject;
    let view = "contentview.ejs"
    if(stuSubject == "physics"){
        res.render(view, {subject: stuSubject})
    } else if(stuSubject == "english"){
        res.render(view, {subject: stuSubject})
    } else if(stuSubject == "biology"){
        res.render(view, {subject: stuSubject})
    } else if(stuSubject == "chemistry"){
        res.render(view, {subject: stuSubject})
    } else if(stuSubject == "civics"){
        res.render(view, {subject: stuSubject})
    } else if(stuSubject == "economics"){
        res.render(view, {subject: stuSubject})
    } else if(stuSubject == "geography"){
        res.render(view, {subject: stuSubject})
    } else if(stuSubject == "hindi"){
        res.render(view, {subject: stuSubject})
    } else if(stuSubject == "history"){
        res.render(view, {subject: stuSubject})
    } else if(stuSubject == "math"){
        res.render(view, {subject: stuSubject})
    } else if(stuSubject == "sanskrit"){
        res.render(view, {subject: stuSubject})
    } else {
        res.send("Invalid Subject")
    }
})
