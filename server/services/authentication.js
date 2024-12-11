const JWT = require("jsonwebtoken");

// const secret = "$uperMan@123";
// const secret = "Grr@S ";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, process.env.SECRET);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, process.env.SECRET);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
