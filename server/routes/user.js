const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => {
  return res.json;
});

router.get("/signup", (req, res) => {
  return res.json;
});

router.post("/signin", async (req, res) => {
  console.log("signedinnnn")
  const { email, password } = req.body;
  console.log(email, password,"userr");

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log(token,"tokennn")
    return res.status(200).cookie("token", token).redirect("/");
  } catch (error) {
    return res.json({
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/Home", (req,res) => {
  redirect("/");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/signup", async (req, res) => {
  console.log("signeduppp");
 
  try{
    const { fullName, email, password } = req.body;

      // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

       // Create a new user
    const newUser = new User({ email, fullName, password });
    await newUser.save();

    return res.redirect("/");
    res.status(201).json({ message: "User created successfully" });
  }

  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
