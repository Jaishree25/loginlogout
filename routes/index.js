var express = require("express");
var router = express.Router();
const userModel = require("./users");

const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/profile", isloggedIn, function (req, res) {
  res.render("profile");
});

//register route
router.post("/register", function (req, res) {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });
  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

//login code
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

// logout code
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//isloggedin function
function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
