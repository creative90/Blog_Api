const express = require("express");
const dotenv = require("dotenv");
const passport = require('passport');  // authentication
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { notFound, errorHandler} = require('./middleware/errorMiddleware');
require('./db').connectToMongoDB() // Connect to MongoDB
require("./middleware/auth") // Signup and login authentication middleware
const PORT = process.env.PORT;
dotenv.config();
const app = express();




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize())




// app.use(
//   '/posts',
//   passport.authenticate('jwt', { session: false }),
//   postRoute
// );

app.use("/", authRoute);
app.use("/api/users", passport.authenticate('jwt', { session: false }), userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


app.set('views', 'views');
app.set('view engine', 'ejs');

// renders the home page
app.get('/', (req, res) => {
  res.render('index');
});

// renders the login page
app.get('/login', (req, res) => {
  res.render('login');
  
});

// renders the signup page
app.get('/signup', (req, res) => {
 // res.send(' Sign up sucessful');
  res.render('signup');
  
});

// renders password reset page
app.get('/reset', (req, res) => {
  res.render('reset', {error: null, success: null});
});

//renders post page
app.get('/api/posts', (req, res) => {
  res.render('post');
});



// // renders the home page
// app.get('/',(req, res) => {
//     res.send('Welcome to the Post API');
// });

 // handles the signup request for existing users
// app.get('/signup', (req, res) => {
 
//  });



// // // handles the login request for existing users
// app.post('/login', (req, res) => {
//   res.redirect('/');
// });


// handles the logout request
app.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});




// use error handler middleware
app.use(errorHandler)
app.use(notFound)

 



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  
  module.exports = app;