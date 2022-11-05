const passport = require('passport');
const jwt = require('jsonwebtoken');
//const User = require('../models/User');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // Use this if you are using Bearer token
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

// This middleware saves the information provided by the user to the database,
// and then sends the user information to the next middleware if successful.
// Otherwise, it reports an error.
passport.use(
    'signup',
    new localStrategy(
        {
          // irst_nameField: 'first_name',
           //last_nameField: 'last_name',         
          //usernameField: 'username',
           //emailField    : 'email',
           // passwordField: 'password',
         passReqToCallback : true,
          
        },
        async ( req,username, password, done) => {
            try {
                const {user_type }= req.body
                const userObject ={
                  first_name:req.body.first_name,
                  last_name: req.body.last_name,
                  username,
                  email: req.body.email,
                  password
                  
                                  
                  }

                if (user_type) userObject.user_type = user_type
                const user = new UserModel(userObject)
                const savedUser = await user.save()

                 return done(null, savedUser);
                

                   

            } catch (error) {
                 done(error);
             }
        }

        
            
            )



    )


// This middleware authenticates the user based on the email and password provided.
// If the user is found, it sends the user information to the next middleware.
// Otherwise, it reports an error.
// passport.use(
//     'login',
//     new localStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
           
//         },
//         async (email, password, done) => {
//             try {
//                 const user = await UserModel.findOne({ email });

//                 if (!user) {
//                     return done(null, false, { message: 'User not found' });
//                 }

//                 const validate = await user.isValidPassword(password);

//                 if (!validate) {
//                     return done(null, false, { message: 'Wrong Password' });
//                 }

//                 return done(null, user, { message: 'Logged in Successfully' });
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

//module.exports= passport;
// 

// require("dotenv").config()

// const TOKEN = process.env.JWT_SECRET

// function authenticateUser(req, res) {
//     return new Promise((resolve, reject) => {
//         let token = req.headers.authorization
        
//         if (!token) {
//             reject("No token provided")
//         }

//         token = token.split(" ")[1]

//         if (token !== TOKEN) {
//             reject("Invalid token!")
//         }

//         resolve()
//     })

// }

// module.exports = {
//     authenticateUser
// }

// const jwt = require("jsonwebtoken");
// require("dotenv").config()

// const config = process.env;

// const authenticateUser = (req, res, next) => {
//   let token =
//     req.body.token || req.query.token || req.headers["authorization"];

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
  
//   try {
//     const decoded = jwt.verify(token, config.JWT_SECRET);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };

// module.exports = authenticateUser;


// passport.use('login', new localStrategy({
//   // by default, local strategy uses username
//   usernameField : 'email',
//   passwordField : 'password',
//   passReqToCallback : true
// },
// async(req, email, password, done) => {
//   if (email) email = email.toLowerCase();

//   // asynchronous
//   process.nextTick(function() {
//       User.findOne({ 'email' :  email }, function(err, user) {
//           // if there are any errors, return the error
//           if (err)
//               return done(err);

//           // if no user is found, return the message
//           if (!user)
//               return done(null, false, req.flash('loginMessage', 'No user found.'));

//           if (!user.validPassword(password))
//               return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

//           // all is well, return user
//           else
//               return done(null, user);
//       });
//   });

// }));


// const authenticateUser = async (email, password, done) => {
//   try {
//     const user = await UserModel.findOne({ email }).select('+password');

//     if (!user) {
//       return done(null, false, { message: 'User Not Found' });
//     }

//     const validate = await user.isValidPassword(password, user.password);

//     if (!validate) {
//       return done(null, false, { message: 'Email or Password Incorrect' });
//     }

//     return done(null, user, { message: 'Logged in Successfully' });
//   } catch (error) {
//     return done(error);
//   }
// };

// passport.use(
//   'login',
//   new localStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//     },
//     authenticateUser
//   )
// );  


passport.use(
  'login',
  new localStrategy(
      {
          usernameField: 'email',
          passwordField: 'password',
           passReqToCallback : true,
      },
      async ( req, email, password, done) => {
          try {
            const {user_type }= req.body
            const userObject ={
              first_name:req.body.first_name,
              last_name:req.body.last_name,
              username: req.body.username,
              email,
              password 
                              
              }
              if (user_type) userObject.user_type = user_type
             
            const user = await UserModel.findOne({ email});

              if (!user) {
                  return done(null, false, { message: 'User not found' });
              }

              const validate = await user.isValidPassword(password);

              if (!validate) {
                  return done(null, false, { message: 'Wrong Password' });
              }

              return done(null, user, { message: 'Logged in Successfully' });
          } catch (error) {
              return done(error);
          }
      }
  )
);
