require("dotenv").config();
const jwt = require("jsonwebtoken");

/* This code creates a signed JWT token from the specified data (in this case, the user's ID)
using a secret key stored in an environment variable. The JWT token can then be used for
user authentication and the validated limited is 1 day to enhance security if JWT is stolen */
const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { createSecretToken };