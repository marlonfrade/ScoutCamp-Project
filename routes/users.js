// Required Stuff
const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
// npm i passport
const passport = require("passport");

// Register Form Page Route
router.get("/register", (req, res) => {
  res.render("users/register");
});

// Register POST user
router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", `Welcome to Yelpcamp ${username}`);
        res.redirect("/campgrounds");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

// Login Form Page
router.get("/login", (req, res) => {
  res.render("users/login");
});

// POST route to Login the User
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { email, username, password } = req.body;
    req.flash("success", `Welcome Back ${username}`);
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

// LogOut the User
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "Goodbye!");
  res.redirect("/");
});

module.exports = router;
