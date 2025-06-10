const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const session = require("express-session");
const fs = require("fs");
const { check, validationResult } = require("express-validator");

app.use(
  session({
    secret: "xxx-jadu-xx",
    resave: false,
    saveUninitialized: true,
  }),
);

const requireLogin = (req, res, next) => {
  if (!req.session.loggedIn) return res.redirect("/login");
  next();
};
app.post(
  "/login",
  [check("username").notEmpty(), check("password").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const users = JSON.parse(fs.readFileSync("users.json"));
    const user = users.find(
      (u) =>
        u.username === req.body.username && u.password === req.body.password,
    );

    if (user) {
      console.log("login successfully");
      req.session.loggedIn = true;
      req.session.username = user.username;
      res.redirect("/home");
    } else {
      res.send("Invalid credentials");
    }
  },
);

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.listen(port, () => {
  console.log("Application Is Active 👍");
});

app.get("/", (req, res) => {
  res.render("login.ejs");
});
app.get("/home", requireLogin, (req, res) => {
  res.render("home.ejs");
});

app.get("/preview/:id", requireLogin, (req, res) => {
  let id = req.params.id;
  res.render("preview.ejs", { id: id });
});
app.get("/home/courses", requireLogin, (req, res) => {
  res.render("courses.ejs");
});
app.get("/courses/:class", requireLogin, (req, res) => {
  let stuClass = req.params.class;
  res.render("content.ejs", { stuclass: stuClass });
});
app.get("/courses/:class/:subject", requireLogin, (req, res) => {
  const stuClass = req.params.class;
  const stuSubject = req.params.subject;
  let view = "contentview.ejs";
  if (stuSubject == "physics") {
    res.render(view, { subject: stuSubject });
  } else if (stuSubject == "english") {
    res.render(view, { subject: stuSubject });
  } else if (stuSubject == "biology") {
    res.render(view, { subject: stuSubject });
  } else if (stuSubject == "chemistry") {
    res.render(view, { subject: stuSubject });
  } else if (stuSubject == "civics") {
    res.render(view, { subject: stuSubject });
  } else if (stuSubject == "economics") {
    res.render(view, { subject: stuSubject });
  } else if (stuSubject == "geography") {
    res.render(view, { subject: stuSubject });
  } else if (stuSubject == "hindi") {
    res.render(view, { subject: stuSubject });
  } else if (stuSubject == "history") {
    res.render(view, { subject: stuSubject });
  } else if (stuSubject == "math") {
    res.render(view, { subject: stuSubject });
  } else if (stuSubject == "sanskrit") {
    res.render(view, { subject: stuSubject });
  } else {
    res.send("Invalid Subject");
  }
});
