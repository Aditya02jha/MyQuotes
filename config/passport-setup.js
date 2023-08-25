const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");
// const mongoose = require("mongoose");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
      done(null, user);
  }).catch((error) => {
      done(error, null);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // option for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function.
      //here you can handle user data after successful login.//profile contains the information of the user //call 'done' with appropriate argument based in logic.
      console.log("entered Google CallBack");
      console.log(profile);

      //find if id already exists.
      User.findOne({ GoogleID: profile.id }).then((Userprofile) => {
        if (Userprofile) {
          console.log(`${profile.displayName} already exists `);
          done(null, Userprofile);
        } else {
          new User(
            {
              userName: profile.displayName,
              emailID: profile.emails[0].value,
              GoogleID: profile.id,
            } //,
            // (err, user) => {
            //   if (err) return done(err);
            //   return done(null, user);
            // }
          )
            .save()
            .then((user) => {
              console.log("Userdata entered successfully");
              done(null, user);
            });
        }
      });
    }
  )
);
