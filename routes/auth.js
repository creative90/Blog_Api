const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authUserLogin = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post('/signup',
   passport.authenticate('signup', { session: false }), async (req, res, next) => {
      res.json({
          message: 'Signup successful',
          user: req.user
       });
   }
 );

authRouter.route('/login').post(authUserLogin)


module.exports = authRouter;




