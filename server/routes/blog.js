const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog");
const { log } = require("console");
// const Comment = require("../models/comment");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

//api for adding new blog
router.get("/add-new", (req, res) => {
  return res.json("addBlog", {
    user: req.user,
  });
});

//api to fetch blogs created by loggedin user
router.get("/my-blogs", async (req, res) => {
  try {
   
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // Fetch blogs created by the logged-in user
    const userBlogs = await Blog.find({ createdBy: req.user._id });

    // Check if the user has created any blogs
    if (userBlogs.length === 0) {
      return res.status(404).json({ message: "No blogs found." });
    }

    // Return the blogs
    return res.status(200).json({
      message: "Blogs fetched successfully.",
      blogs: userBlogs,
    });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

//api for view detailed blog
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  console.log(blog,"bloggg")
 
  return res.json({
    user: req.user,
    blog,
  });
});


//api for edit any blog
router.put("/blog/:id", upload.single("coverImage"), async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const { id } = req.params; 
    const { title, body, coverImageURL } = req.body; // Extract updated title and body from request

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Check if the logged-in user is the creator of the blog
    if (!blog.createdBy.equals(req.user._id) && req.user.role !=="ADMIN" ) {
      return res
        .status(403)
        .json({ message: "Forbidden. You are not the creator of this blog." });
    }

    // Update fields (only if they exist in the request)
    if (title) blog.title = title;
    if (body) blog.body = body;
    if (coverImageURL) blog.coverImageURL = coverImageURL;

    // Update cover image if a new file is uploaded
    if (req.file) {
      blog.coverImageURL = `/uploads/${req.file.filename}`;
    }

    // Save the updated blog
    await blog.save();
    console.log(req,"requesttt");
    console.log(res,"responsee");
    
    res.status(200).json({
      message: "Blog updated successfully.",
      blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


//api to delete any blog
router.delete("/blog/:id", async (req, res) => {
  console.log("enter");
  try {
    console.log("triedd");
  
    const { id } = req.params;
    console.log("received id",id);

    // Check if the blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the blog
    await Blog.findByIdAndDelete(id);
    console.log("deleted");

    return res.status(200).send({"message": "Deleted Succesfully"});
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//api to create new blog
router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
