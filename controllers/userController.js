const asyncHandler = require('express-async-handler')
const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
const userUpdate = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE
const userDelete = asyncHandler (async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


// handles the change password request
 const passwordReset = asyncHandler(async (req, res) => {
  const userInfo = req.body;
  User.findOne({ username: userInfo.username }, (err, user) => {
      if (err) {
          console.log(err);
          res.render('reset', { error: err });
      } else {
          user.changePassword(userInfo.password, userInfo.new_password, (err, user) => {
              if (err) {
                  console.log(err);
                  res.status(500).send(err);
              } else {
                  res.render('reset', { error: null, success: 'Password changed successfully!' });
              }
          }); 
      }
  });
});

module.exports = {userUpdate, userDelete, getUser, passwordReset, };