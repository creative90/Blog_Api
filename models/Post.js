const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,//mongoose.Schema.Types.ObjectId,
      //ref: 'User',
      required: true,
    },
    state: {
      type: String,
      default: 'draft',
      enum: ['draft', 'published']
    },
    read_count: {
      type: Number,
      default: 0,
    },

    reading_time: {
      type: Number,
      required: false,
    },
    tags: {
      type: String,
      required: false,
    },

    body: {
      type: String,
      
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      
    },
    createAt : {
      type: Date,
      default: Date.now
  },
  lastUpdateAt : {
      type: Date,
      default: Date.now
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
