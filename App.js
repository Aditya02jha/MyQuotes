const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const mongoose = require('mongoose');
const keys = require('./config/keys');


const app = express();

app.set('view engine' , 'ejs');

app.use(session({
    secret: [keys.session.cookieKey],   // Change this to your actual secret key
    resave: false,
    saveUninitialized: false
  }));

// // initialize passport
app.use(passport.initialize());
app.use(passport.session());

(async () => {
    try {
      await mongoose.connect(keys.mongo.mongo_Connect_key);
      console.log('Connected to the database');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  })();
  



app.use('/auth' , authRoutes);

app.get('/' , (req,res) =>{ 
    res.render('index');
}) 


//start the server.
const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=> console.log(`Server is running on Port ${PORT}`));








