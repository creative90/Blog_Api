const User = require("../models/User");
const Post = require("../models/Post");
const asyncHandler = require('express-async-handler')
const  readingTime  = require('../utils/readingTime')
//CREATE POST

const createPost = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, tags, author, username, body } = req.body
    const newPost = new Post({
      title,
      description: description || title,
      tags,
      author,
      username,
      body,
      reading_time: readingTime(body)
    })
   
    const createdPost = await newPost.save()
    
    return res.status(201).json({
      status: true,
      data: createdPost,
    })
  } catch (e) {
    next(e)
  }
});

//UPDATE POST
const updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
const deletePost = asyncHandler (async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
const getPost= asyncHandler(async (req, res, next) => {
  
  try {
    const { id } = req.params
    const post = await Post.findById(id)
      .populate('author', { username: 1 })

    if (post.state !== 'published') {
      return res.status(403).json({
        status: false,
        error: 'Requested post is not published'
      })
    }

    // update post read count
    post.read_count += 1
    await post.save()

    return res.json({
      status: true,
      data: post
    })
  } catch (err) {
    err.source = 'get published post controller'
    next(err)
  }

});


//GET ALL POSTS
const getAllPosts= asyncHandler(async(req, res, next) => {
  
  try {
    const posts = await Post
      .find({ state: 'published' })
      .select({ title: 1 })
      .populate('author', { username: 1 })
      .skip(req.pagination.start)
      .limit(req.pagination.sizePerPage)

    const pageInfo = {}
    pageInfo.currentPage = req.pagination.page
    if (req.pagination.previousPage) pageInfo.previousPage = req.pagination.previousPage
    if (req.pagination.nextPage) pageInfo.nextPage = req.pagination.nextPage

    return res.json({
      status: true,
      pageInfo,
      data: posts
    })
  } catch (err) {
    err.source = 'get published blogs controller'
    next(err)
  }

});

module.exports = {createPost, updatePost, deletePost, getPost, getAllPosts};
