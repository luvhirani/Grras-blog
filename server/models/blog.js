const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user", //this is refrencing to user table to show the blog created by which user inside blog
    }
  },
  { timestamps: true }
);

const Blog = model("blog", blogSchema);

module.exports = Blog;
