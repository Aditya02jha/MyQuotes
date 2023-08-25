const router = require("express").Router();
const passport = require("passport");
// const { google } = require("../config/keys");
//auth login
router.get("/login", (req, res) => {
  res.render("login" , {user:req.user});
});

router.get("/logout", (req, res) => {
  //handle with passport
  res.send("logging out !!");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // res.send(req.user);
    res.redirect('/');
  }
);



// router.get(
//     "/google/redirect",
//     passport.authenticate("google", { failureRedirect: "/login" }),
//     (req, res) => {
//       try {
//         console.log("Entering /auth/google/redirect");
  
//         // Additional debugging statements
//         console.log("User:", req.user);
//         console.log("Session:", req.session);
  
//         // Rest of your code
//         res.redirect('/');
//       } catch (error) {
//         console.log('Got error during redirect')
//       }
//     }
//   );
//   By adding these debugging statements and error handling, you can get more insight into what's happening during the redirection process and identify any issues that might be causing the problem. Make sure to remove or comment out the debugging statements once you've resolved the issue to keep your code clean.
  
  
  
  
  
  


module.exports = router;
