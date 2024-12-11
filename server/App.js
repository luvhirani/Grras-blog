require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Blog = require("./models/blog");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const methodOverride = require("method-override");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(cors()); // Enable CORS for React frontend

app.use(checkForAuthenticationCookie("token"));

// Serve static files (images, etc.)
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.status(200).json({ blogs: allBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// User and Blog Routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);

// Serve React Frontend in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
